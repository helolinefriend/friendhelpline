




import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../../lib/mongodb';
import Kycs from '../../../../../../models/Kycs';
import User from '../../../../../../models/User';
import { verify } from 'jsonwebtoken'; 
import cloudinary from '../../../../../../lib/cloudinary';

const JWT_SECRET = process.env.JWT_SECRET;

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing
//   },
// };

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

    const form = new URLSearchParams(await req.text());
    const aadhar = form.get('aadhar');
    const pan = form.get('pan');
    const kycStatus = form.get('kycStatus');
    const aadharpicBase64 = form.get('aadharpic');
    const panpicBase64 = form.get('panpic');

    console.log("ader", aadhar)
    console.log("pan", pan)
    console.log("kycStatus", kycStatus)
    // console.log("aadharpicBase64", aadharpicBase64)
    // console.log("panpicBase64", panpicBase64)

    if (!aadhar || !pan || !aadharpicBase64 || !panpicBase64) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Upload images to Cloudinary
    const aadharPicUpload = await cloudinary.uploader.upload(`data:image/png;base64,${aadharpicBase64}`);
    const panPicUpload = await cloudinary.uploader.upload(`data:image/png;base64,${panpicBase64}`);

    const newKyc = new Kycs({
      user: id,
      aadhar,
      pan,
      kycStatus,
      aadharpic: aadharPicUpload.secure_url,
      panpic: panPicUpload.secure_url,
    });

    await newKyc.save();

    return NextResponse.json(newKyc, { status: 201 });
  } catch (err) {
    console.error('Error creating KYC:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
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

    const formData = await req.formData();
    const updates = {};

    if (formData.has('aadhar')) updates.aadhar = formData.get('aadhar');
    if (formData.has('pan')) updates.pan = formData.get('pan');
    if (formData.has('kycStatus')) updates.kycStatus = formData.get('kycStatus');

    if (formData.has('aadharpic')) {
      const aadharpicFile = formData.get('aadharpic');
      const aadharpicBuffer = await aadharpicFile.arrayBuffer();
      const aadharpicBase64 = Buffer.from(aadharpicBuffer).toString('base64');
      const aadharPicUpload = await cloudinary.uploader.upload(`data:${aadharpicFile.type};base64,${aadharpicBase64}`);
      updates.aadharpic = aadharPicUpload.secure_url;
    }

    if (formData.has('panpic')) {
      const panpicFile = formData.get('panpic');
      const panpicBuffer = await panpicFile.arrayBuffer();
      const panpicBase64 = Buffer.from(panpicBuffer).toString('base64');
      const panPicUpload = await cloudinary.uploader.upload(`data:${panpicFile.type};base64,${panpicBase64}`);
      updates.panpic = panPicUpload.secure_url;
    }

    const kyc = await Kycs.findOneAndUpdate({ user: id }, updates, { new: true });

    return NextResponse.json(kyc, { status: 200 });
  } catch (err) {
    console.error('Error updating KYC:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
