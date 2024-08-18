import { NextResponse } from 'next/server';

import Profile from '../../../../../../models/Profile';
import Transaction from '../../../../../../models/Transaction';
import Kycs from '../../../../../../models/Kycs';

import connectToDatabase from '../../../../../../lib/mongodb';
import User from '../../../../../../models/User';
import { middleware } from '../../../../../../lib/middleware'; 
import mongoose from 'mongoose'; // Ensure mongoose is imported correctly

export async function GET(req, { params }) {
  await middleware(req); // Call the middleware to check admin status

  const { id } = params;

  try {
    await connectToDatabase();

    // Fetch user information
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Fetch related profile
    const profile = await Profile.findOne({ user: user._id });

    // Fetch related transactions
    const transactions = await Transaction.find({ user: user._id });

    // Fetch KYC information
    const kyc = await Kycs.findOne({ user: user._id });

    // Combine all data
    const userData = {
      user,
      profile,
      transactions,
      kyc,
    };

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}




export async function DELETE(req, { params }) {
  await middleware(req); // Ensure the user is an admin

  const { id } = params;

  try {
    await connectToDatabase();

    // Delete the user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Delete related profile, KYC, and transactions
    await Profile.findOneAndDelete({ user: id });
    await Kycs.findOneAndDelete({ user: id });
    await Transaction.deleteMany({ user: id });

    return NextResponse.json({ message: 'User and related data deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}



export async function PUT(req, { params }) {
  const { id } = params;
  const {
    userUpdate,       // User fields to update
    profileUpdate,    // Profile fields to update
    kycUpdate,        // KYC fields to update
    transactionUpdate // Transaction fields to update
  } = await req.json();

  try {
    await connectToDatabase();

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, userUpdate, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update profile
    const updatedProfile = await Profile.findOneAndUpdate({ user: id }, profileUpdate, { new: true });

    // Update KYC
    const updatedKyc = await Kycs.findOneAndUpdate({ user: id }, kycUpdate, { new: true });

    // Update transactions if provided
    if (transactionUpdate && transactionUpdate.transactionId) {
      const { transactionId, paymentStatus } = transactionUpdate;

      // Validate ObjectId
      if (mongoose.Types.ObjectId.isValid(transactionId)) {
        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, { paymentStatus }, { new: true });

        if (!updatedTransaction) {
          return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({
          user: updatedUser,
          profile: updatedProfile,
          kyc: updatedKyc,
          transaction: updatedTransaction
        });
      } else {
        return NextResponse.json({ message: 'Invalid transaction ID' }, { status: 400 });
      }
    }

    return NextResponse.json({
      user: updatedUser,
      profile: updatedProfile,
      kyc: updatedKyc,
      transaction: null
    });

  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

