// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Transaction from '../../../../models/Transaction';

// export async function GET(req, { params }) {
//   try {
//     await connectToDatabase();
//     const { id } = params;

//     const transaction = await Transaction.findById(id);

//     if (!transaction) {
//       return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
//     }

//     return NextResponse.json({ transaction }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching transaction:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }





// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Transaction from '../../../../models/Transaction';
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




import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Transaction from '../../../../models/Transaction';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

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

    const decoded = verify(token, JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    const { id } = params; // Extract the ID from params

    const transaction = await Transaction.findById(id).populate('user');
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ transaction }, { status: 200 });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

 