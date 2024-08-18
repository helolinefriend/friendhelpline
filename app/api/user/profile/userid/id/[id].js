// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../../lib/mongodb';
// import User from '../../../../../models/User';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req, { params }) {
//   const { id } = params;
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     await connectToDatabase();
//     const decoded = verify(token, JWT_SECRET);

//     if (decoded.userId !== id) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
//     }

//     const user = await User.findById(id);

//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ 
//       userId: user._id,
//       username: user.username,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       profileImage: user.profile,
//       kycStatus: user.kycStatus
//     }, { status: 200 });
//   } catch (err) {
//     console.error('Failed to fetch user profile', err);
//     return NextResponse.json({ message: 'Failed to fetch user profile' }, { status: 500 });
//   }
// }

