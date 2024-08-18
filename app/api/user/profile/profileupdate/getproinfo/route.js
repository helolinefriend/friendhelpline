// import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
// import connectToDatabase from '../../../../../../lib/mongodb';
// import Profile from '../../../../../../models/Profile';
// import User from '../../../../../../models/User';
// const JWT_SECRET = process.env.JWT_SECRET;


// export async function GET(req) {
//   const authHeader = req.headers.get('authorization');

//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     await connectToDatabase();
//     const decoded = verify(token, JWT_SECRET);

//     const profileData = await Profile.findOne({ user: decoded.userId });
//     const userData = await User.findById(decoded.userId);

//     if (!profileData || !userData) {
//       return NextResponse.json({ message: 'Profile or User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ profileData, userData }, { status: 200 });
//   } catch (err) {
//     console.error('Error fetching profile:', err);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
// import connectToDatabase from '../../../../../../lib/mongodb';
// import Profile from '../../../../../../models/Profile';
// import User from '../../../../../../models/User';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req) {
//   const authHeader = req.headers.get('authorization');

//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     await connectToDatabase();
//     const decoded = verify(token, JWT_SECRET);

//     const profileData = await Profile.findOne({ user: decoded.userId });
//     const userData = await User.findById(decoded.userId);

//     console.log("profileData", profileData)
//     console.log("userData", userData)

//     if (!profileData || !userData) {
//       return NextResponse.json({ message: 'Profile or User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ user: userData, profile: profileData }, { status: 200 });
//   } catch (err) {
//     console.error('Error fetching profile:', err);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }




// test 1 

// import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
// import connectToDatabase from '../../../../../../lib/mongodb';
// import Profile from '../../../../../../models/Profile';
// import User from '../../../../../../models/User';


// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req) {
//   const authHeader = req.headers.get('authorization');

//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     await connectToDatabase();
//     const decoded = verify(token, JWT_SECRET);

//     const profileData = await Profile.findOne({ user: decoded.userId }).lean();
//     const userData = await User.findById(decoded.userId).lean();

//     if (!profileData || !userData) {
//       return NextResponse.json({ message: 'Profile or User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ user: userData, profile: profileData }, { status: 200 });
//   } catch (err) {
//     console.error('Error fetching profile:', err);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }


// test 2 
// work perfect 

import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '../../../../../../lib/mongodb';
import Profile from '../../../../../../models/Profile';
import User from '../../../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET;
 
export async function GET(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  }

  const token = authHeader.split(' ')[1];

  try {
    await connectToDatabase();
    const decoded = verify(token, JWT_SECRET);

    const profileData = await Profile.findOne({ user: decoded.userId }).lean();
    const userData = await User.findById(decoded.userId).lean();

    if (!userData) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const defaultProfile = {
      phoneNumber: 'N/A',
      address1: 'N/A',
      address2: 'N/A',
      state: 'N/A',
      pincode: 'N/A',
      bankname: 'N/A',
      accountnumbar: 'N/A',
      ifcecode: 'N/A',
      bankbranch: 'N/A',
      bankfulladdress: 'N/A',
      realname: 'N/A',
      qr: '',
      upiid: 'N/A',
      kycStatus: 'non kyc',
      profilepic: '',
    };

    return NextResponse.json({ user: userData, profile: profileData || defaultProfile }, { status: 200 });
  } catch (err) {
    console.error('Error fetching profile:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

