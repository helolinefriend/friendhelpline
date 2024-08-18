import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { filename } = params;

  const filePath = path.join(process.cwd(), 'upload', filename);

  try { 
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    const file = fs.readFileSync(filePath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
