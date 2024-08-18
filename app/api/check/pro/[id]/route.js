import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import Profile from '../../../../../models/Profile';
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


    const profile = await Profile.findOne({ user: id });

    if (!Profile) {
      return NextResponse.json({ message: 'Profile record not found' }, { status: 404 });
    }

    return NextResponse.json({ profile }, { status: 200 });


  } catch (err) {
    console.error('Error fetching Profile:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}