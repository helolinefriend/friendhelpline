import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';
import User from '../../../models/User';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
export const dynamic = 'force-dynamic'; 
 
export async function GET(req) {
  try {
    await connectToDatabase();

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 403 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 403 });
    }

    const decoded = verify(token, JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    // Fetch the referred users
    const referredUsers = await User.find({ referredBy: userId }).lean();
    const referredUserIds = referredUsers.map(user => user._id);

    // Fetch transactions for referred users
    const transactions = await Transaction.find({ user: { $in: referredUserIds } }).populate('user');

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error('Error fetching referred transactions:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
