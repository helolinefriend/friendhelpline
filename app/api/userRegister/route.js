// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../lib/mongodb';
// import User from '../../../models/User';
// import bcrypt from 'bcryptjs';

// export async function POST(req) {
//   try {
//     const { email, username, password, referralLink } = await req.json();

//     if (!email || !username || !password ) {
//       return NextResponse.json({ message: 'Email, username, password, and are required' }, { status: 400 });
//     }

//     await connectToDatabase();

//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return NextResponse.json({ message: 'User with this email or username already exists' }, { status: 422 });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10);

//     let referredBy = null;
//     if (referralLink) {
//       const referrer = await User.findOne({ referralLink });
//       if (referrer) {
//         referredBy = referrer._id;
//       }
//     }

//     const newUser = new User({
//       email,
//       username,
//       password: hashedPassword,
//       referralLink: `ref_${Date.now()}`,
//       referredBy,
//     });

//     await newUser.save();

//     return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }




import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, username, password, referralLink } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json({ message: 'Email, username, and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email or username already exists' }, { status: 422 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let referredBy = null;
    if (referralLink) {
      const referrer = await User.findOne({ referralLink });
      if (referrer) {
        referredBy = referrer._id;
      }
    }

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      referralLink: `ref_${Date.now()}`,
      referredBy,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
