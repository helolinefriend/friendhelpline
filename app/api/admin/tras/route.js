
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Transaction from '../../../../models/Transaction';
import { middleware } from '../../../../lib/middleware'; 
export async function GET(req, { params }) {
    await middleware(req); 

  try {
    await connectToDatabase();
    const transaction = await Transaction.find();
    
    if (!transaction) {
      return NextResponse.json({ message: 'transaction not found' }, { status: 404 });
    }
    
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
