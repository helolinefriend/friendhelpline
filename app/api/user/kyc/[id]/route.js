// test 6 get req with id and post 


// working code 
// pages/api/user/kyc/[id].js
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import User from '../../../../../models/User';
import Kycs from '../../../../../models/Kycs';
import connectToDatabase from '../../../../../lib/mongodb';


const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req, { params }) { 
  const { id } = params;
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  } 

  const token = authHeader.split(' ')[1];

  try {
    await connectToDatabase();
    const decoded = verify(token, JWT_SECRET);

    // Ensure the requested KYC record belongs to the current user
    if (decoded.userId !== id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const kyc = await Kycs.findOne({ user: id });

    if (!kyc) {
      return NextResponse.json({ message: 'KYC record not found' }, { status: 404 });
    }

    return NextResponse.json({ kyc }, { status: 200 });
  } catch (err) {
    console.error('Error fetching KYC:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = params;
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  }

  const token = authHeader.split(' ')[1];

  try {
    await connectToDatabase();
    const decoded = verify(token, JWT_SECRET);

    if (decoded.userId !== id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const existingKyc = await Kycs.findOne({ user: id });
    if (existingKyc) {
      return NextResponse.json({ redirect: true, kycId: existingKyc._id }, { status: 400 });
    }

    const { aadhar, pan, kycStatus, aadharpic, panpic } = await req.json();

    const aadharPic = aadharpic ? aadharpic.split(';base64,').pop() : undefined;
    const panPic = panpic ? panpic.split(';base64,').pop() : undefined;

    const newKyc = new Kycs({
      user: id,
      aadhar,
      pan,
      kycStatus,
      aadharpic: aadharPic ? `data:image/jpeg;base64,${aadharPic}` : undefined,
      panpic: panPic ? `data:image/jpeg;base64,${panPic}` : undefined,
    });

    await newKyc.save();

    return NextResponse.json(newKyc, { status: 201 });
  } catch (err) {
    console.error('Error creating KYC:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js built-in body parser
//   },
// }; 

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 403 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, JWT_SECRET);

    if (!decoded || decoded.userId !== id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const formData = await req.formData();
    const fields = Object.fromEntries(formData.entries());
    const files = Array.from(formData.values()).filter(value => value instanceof File);

    console.log('Fields:', fields); // Log all fields
    console.log('Files:', files);   // Log all files

    const { aadhar, pan, kycStatus } = fields;
    const aadharPic = files.find(file => file.name === 'aadharpic');
    const panPic = files.find(file => file.name === 'panpic');

    let kycData = await Kycs.findOne({ user: id });

    if (!kycData) {
      return NextResponse.json({ message: 'KYC record not found' }, { status: 404 });
    }

    if (aadhar) kycData.aadhar = aadhar;
    if (pan) kycData.pan = pan;
    if (kycStatus) kycData.kycStatus = kycStatus;

    if (aadharPic) {
      const base64AadharPic = await readFileAsBase64(aadharPic);
      console.log('Base64 AadharPic:', base64AadharPic); // Log Base64 data
      kycData.aadharpic = `data:image/jpeg;base64,${base64AadharPic}`;
    }

    if (panPic) {
      const base64PanPic = await readFileAsBase64(panPic);
      console.log('Base64 PanPic:', base64PanPic); // Log Base64 data
      kycData.panpic = `data:image/jpeg;base64,${base64PanPic}`;
    }

    kycData.updatedAt = Date.now();

    await kycData.save();

    return NextResponse.json(kycData, { status: 200 });
  } catch (err) {
    console.error('Error updating KYC:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

async function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',').pop();
      console.log('Read file as Base64:', base64String); // Log Base64 string
      resolve(base64String);
    };
    reader.onerror = (error) => {
      console.error('Error reading file as Base64:', error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
