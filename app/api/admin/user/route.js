// /pages/api/admin/admin/route.js




import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';



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

    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.role === 'admin') {
      return NextResponse.json({ message: 'Access granted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }
  } catch (err) {
    console.error('Error verifying admin access:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
