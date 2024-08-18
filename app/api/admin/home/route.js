import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Home from '../../../../models/Ahome';

 

export async function GET() {
  try {
    await connectToDatabase();
    const homeData = await Home.findOne();
    
    // If no data found, create default data
    if (!homeData) {
      const defaultHome = new Home({
        title: 'Welcome to our website!' ,
        subtitle: 'We are glad to have you here.',
        imageUrl: ''
      });

      await defaultHome.save();
      return NextResponse.json(defaultHome);
    }

    return NextResponse.json(homeData);
  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const homeData = await req.json();

  try {
    await connectToDatabase();
    
    // Provide default values if fields are null or undefined
    const updatedHome = await Home.findOneAndUpdate(
      {},
      {
        ...homeData, // Spread the homeData object to update all fields
      },
      { new: true, upsert: true } // upsert: true creates a new document if no matching document is found
    );
    
    return NextResponse.json(updatedHome);
  } catch (error) {
    console.error('Error updating home data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

