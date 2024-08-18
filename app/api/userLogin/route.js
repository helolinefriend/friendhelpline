// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../lib/mongodb';
// import User from '../../../models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function POST(req) {
//   const { email, password } = await req.json();
  
//   await connectToDatabase();
  
//   const user = await User.findOne({ email });
//   if (!user) {
//     return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//   }
  
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//   }

//   const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
//   const refreshToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

//   return NextResponse.json({ token, refreshToken }, { status: 200 });
// }



// test code 1 

import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { email, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  const referrerId = user._id; // Assuming the referrerId is the user's ID
  const token = jwt.sign({ userId: user._id, role: user.role, referrerId }, JWT_SECRET, { expiresIn: '72h' });
  const refreshToken = jwt.sign({ userId: user._id, role: user.role, referrerId }, JWT_SECRET, { expiresIn: '7d' });

  return NextResponse.json({ token, refreshToken }, { status: 200 });
}
