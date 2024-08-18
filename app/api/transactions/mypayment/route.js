// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Transaction from '../../../../models/Transaction';


// export async function GET(req) {
//     try {
//       await connectToDatabase();
  
//       const transactions = await Transaction.find().populate('user');
//       return NextResponse.json(transactions, { status: 200 });
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// }





// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Transaction from '../../../../models/Transaction';
// import User from '../../../../models/User';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req) {
//   try {
//     await connectToDatabase();

//     const authHeader = req.headers.get('authorization');
//     if (!authHeader) {
//       return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//     }

//     const decoded = verify(token, JWT_SECRET);
//     const userId = decoded.userId;

//     if (!userId) {
//       return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
//     }

//     const transactions = await Transaction.find({ user: userId }).populate('user');
//     return NextResponse.json(transactions, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }



// gpt build error 

import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Transaction from '../../../../models/Transaction';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const dynamic = 'force-dynamic'; // This forces the route to be dynamically rendered

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

    const transactions = await Transaction.find({ user: userId }).populate('user');
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
