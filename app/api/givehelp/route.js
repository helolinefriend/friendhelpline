
// import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
// import connectToDatabase from '../../../lib/mongodb';
// import User from '../../../models/User';
// import Profile from '../../../models/Profile';

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

//     const userData = await User.findById(decoded.userId).populate('referredBy').lean();
//     if (!userData) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     const profileData = await Profile.findOne({ user: userData._id }).lean();
    
//     return NextResponse.json({
//       myInfo: userData,
//       referredBy: userData.referredBy,
//       profile: profileData
//     }, { status: 200 });

   
//   } catch (err) {
//     console.error('Error fetching referral data:', err);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import Profile from '../../../models/Profile';

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

    const userData = await User.findById(decoded.userId).populate('referredBy').lean();
    if (!userData) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const profileData = await Profile.findOne({ user: userData._id }).lean();
    const referredByProfile = userData.referredBy ? await Profile.findOne({ user: userData.referredBy._id }).lean() : null;

    return NextResponse.json({
      myInfo: userData,
      referredBy: userData.referredBy,
      profile: profileData,
      referredByProfile: referredByProfile
    }, { status: 200 });
  } catch (err) {
    console.error('Error fetching referral data:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


