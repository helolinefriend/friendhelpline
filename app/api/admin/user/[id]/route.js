// /pages/api/admin/user/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import Profile from '../../../../../models/Profile';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const userId = params.id;
    const user = await User.findById(userId).lean();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the user has the admin role
    if (user.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const users = await User.find({}).lean(); // Fetch all users
    
    const profile = await Profile.find({}).lean();
    return NextResponse.json(users, profile,{ status: 200 });

  } catch (err) {
    console.error('Error fetching users:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
