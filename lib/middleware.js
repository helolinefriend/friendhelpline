import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Adjust the path as needed
import connectToDatabase from '../lib/mongodb'; // Adjust the path as needed

export async function middleware(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have a secret in your .env file

    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    req.user = user; // Attach user info to request

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
