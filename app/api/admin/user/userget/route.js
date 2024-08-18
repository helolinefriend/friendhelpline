// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../../lib/mongodb';
// import User from '../../../../../models/User';
// import Profile from '../../../../../models/Profile';

// import { middleware } from '../../../../../lib/middleware'; 

// export async function GET(req, { params }) {
//     await middleware(req); 

//   try {
//     await connectToDatabase();
//     const users = await User.find();
//     const profile = await Profile.find();
    
//     if (!users) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     if (!profile) {
//       return NextResponse.json({ message: 'profile not found' }, { status: 404 });
//     }
    
//     return NextResponse.json(users, profile);
//   } catch (error) {
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import Profile from '../../../../../models/Profile';
import { middleware } from '../../../../../lib/middleware'; 

export async function GET(req, { params }) {
    await middleware(req); 

    try {
        await connectToDatabase();

        const users = await User.find();
        const profiles = await Profile.find();

        if (!users || !profiles) {
            return NextResponse.json({ message: 'Data not found' }, { status: 404 });
        }

        return NextResponse.json({ users, profiles });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
