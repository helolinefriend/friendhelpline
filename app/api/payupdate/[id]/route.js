

// working code  
// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Transaction from '../../../../models/Transaction';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function PUT(req, { params }) {
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

//     const { id } = params; // Extract the ID from the params
//     const { paymentStatus } = await req.json();

//     if (!paymentStatus) {
//       return NextResponse.json({ message: 'Payment status is required' }, { status: 400 });
//     }

//     const transaction = await Transaction.findById(id);
//     if (!transaction) {
//       return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
//     }

//     if (transaction.user.toString() !== userId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
//     }

//     transaction.paymentStatus = paymentStatus;
//     await transaction.save();

//     return NextResponse.json({ message: 'Payment status updated successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating payment status:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }




// test code  

// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Transaction from '../../../../models/Transaction';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function PUT(req) {
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

//     console.log("userId", userId)

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get('id');

//     const { paymentStatus } = await req.json();

//     if (!paymentStatus) {
//       return NextResponse.json({ message: 'Payment status is required' }, { status: 400 });
//     }

//     const transaction = await Transaction.findById(id);
//     if (!transaction) {
//       return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
//     }

//     if (transaction.referrerId !== userId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
//     }

//     transaction.paymentStatus = paymentStatus;
//     await transaction.save();

//     return NextResponse.json({ message: 'Payment status updated successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating payment status:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }



// test code 2
// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Transaction from '../../../../models/Transaction';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function PUT(req, { params }) {
//   const { id } = params;

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

//     const { paymentStatus, referrerId } = await req.json();

//     if (!paymentStatus) {
//       return NextResponse.json({ message: 'Payment status is required' }, { status: 400 });
//     }

//     const transaction = await Transaction.findById(id);
//     if (!transaction) {
//       return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
//     }

//     if (transaction.referrerId.toString() !== referrerId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
//     }

//     transaction.paymentStatus = paymentStatus;
//     await transaction.save();

//     return NextResponse.json({ message: 'Payment status updated successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating payment status:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }


// test 3 

import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Transaction from '../../../../models/Transaction';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function PUT(req, { params }) {
  const { id } = params;
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
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error('Error decoding token:', err);
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }
    const userReferrerId = decoded.referrerId;
    if (!userReferrerId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    const { paymentStatus } = await req.json();

    if (!paymentStatus) {
      return NextResponse.json({ message: 'Payment status is required' }, { status: 400 });
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    if (transaction.referrerId.toString() !== userReferrerId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    transaction.paymentStatus = paymentStatus;
    await transaction.save();

    return NextResponse.json({ message: 'Payment status updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

