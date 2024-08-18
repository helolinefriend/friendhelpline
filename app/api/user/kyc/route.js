import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
// import Kycs from '../../../../models/Kyc';  
import Kycs from '../../../../models/Kycs';  

// Adjust the import path as needed



export async function GET(req) {
  try {
    await connectToDatabase();

    const kyc = await Kycs.find().populate('user');  // Populate user data if needed

    if (!kyc) {
      return NextResponse.json({ message: 'No KYC data found' }, { status: 404 });
    }

    return NextResponse.json({ kyc }, { status: 200 });
  } catch (error) {
    console.error('Error fetching KYC data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
