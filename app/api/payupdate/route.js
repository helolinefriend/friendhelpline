
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';
import { verify } from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

export const dynamic = 'force-dynamic'; 

export async function GET(req, { params }) {
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

    const { id } = params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ transaction }, { status: 200 });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}