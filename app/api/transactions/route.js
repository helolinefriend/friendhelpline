import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import Profile from '../../../models/Profile';
import Transaction from '../../../models/Transaction';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// Multer setup to store files in the upload folder
const storage = multer.diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export async function POST(req, res) {
  try {
    await connectToDatabase();

    const { fields, files } = await new Promise((resolve, reject) => {
      const multerMiddleware = upload.single('screenshot');
      multerMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve({
          fields: req.body,
          files: req.file,
        });
      });
    });


    const { userId, amount, screenshot } = await req.json();
    // const { userId, amount, screenshot } = fields;

    if (!userId || !amount || !screenshot) {
      return NextResponse.json({ message: 'User ID, amount, and screenshot are required' }, { status: 400 });
    }

    // Decode base64 screenshot and save it
    const base64Data = screenshot.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const screenshotPath = path.join('./upload', `${Date.now()}-screenshot.jpg`);
    await writeFile(screenshotPath, buffer);

    const user = await User.findById(userId).populate('referredBy');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const referrerProfile = await Profile.findOne({ user: user.referredBy?._id }).lean();

    const transaction = new Transaction({
      user: userId,
      amount,
      screenshot: screenshotPath,
      referrerId: user.referredBy?._id,
      referrerUsername: user.referredBy?.username,
      referrerEmail: user.referredBy?.email,
      referrerPhoneNumber: referrerProfile?.phoneNumber,
      referrerQR: referrerProfile?.qr,
      referrerUpiId: referrerProfile?.upiid,
      paymentStatus: 'not received',
      adminUpdate: 'pending',
    });
    await transaction.save();

    return NextResponse.json({ message: 'Payment processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../lib/mongodb';
// import User from '../../../models/User';
// import Profile from '../../../models/Profile';
// import Transaction from '../../../models/Transaction';
// import upload from '../multer/multer.js'; // Import the Multer middleware
// import fs from 'fs';
// import path from 'path';
// import { promisify } from 'util';

// const writeFile = promisify(fs.writeFile);

// // Internal utility function to handle the Multer middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export async function POST(req) {
//   try {
//     await connectToDatabase();

//     await runMiddleware(req, {}, upload.single('screenshot'));

//     const { userId, amount } = await req.json();
//     const screenshot = req.file;

//     if (!userId || !amount || !screenshot) {
//       return NextResponse.json({ message: 'User ID, amount, and screenshot are required' }, { status: 400 });
//     }

//     // Save the uploaded screenshot
//     const screenshotPath = path.join('./upload', screenshot.filename);
//     await writeFile(screenshotPath, screenshot.buffer);

//     const user = await User.findById(userId).populate('referredBy');
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     const referrerProfile = await Profile.findOne({ user: user.referredBy?._id }).lean();

//     const transaction = new Transaction({
//       user: userId,
//       amount,
//       screenshot: screenshotPath,
//       referrerId: user.referredBy?._id,
//       referrerUsername: user.referredBy?.username,
//       referrerEmail: user.referredBy?.email,
//       referrerPhoneNumber: referrerProfile?.phoneNumber,
//       referrerQR: referrerProfile?.qr,
//       referrerUpiId: referrerProfile?.upiid,
//       paymentStatus: 'not received',
//       adminUpdate: 'pending',
//     });

//     await transaction.save();

//     return NextResponse.json({ message: 'Payment processed successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }

 