

import { NextResponse } from 'next/server';


import Transaction from '../../../../../models/Transaction';
import connectToDatabase from '../../../../../lib/mongodb';
import { middleware } from '.././../../../../lib/middleware'; 
import mongoose from 'mongoose'; // Ensure mongoose is imported correctly


export async function GET(req, { params }) {
  await middleware(req); // Call the middleware to check admin status

  const { id } = params; // Get transaction ID from URL parameters

  try {
    await connectToDatabase();

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
    await middleware(req); // Call the middleware to check admin status
  
    const { id } = params; // Get transaction ID from URL parameters
  
    try {
      await connectToDatabase();
  
      const transactionData = await req.json();
  
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        transactionData,
        { new: true }
      );
  
      if (!updatedTransaction) {
        return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
      }
  
      return NextResponse.json(updatedTransaction);
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
  