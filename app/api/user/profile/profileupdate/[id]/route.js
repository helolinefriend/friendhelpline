import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import User from '../../../../../../models/User';
import Profile from '../../../../../../models/Profile';
import connectToDatabase from '../../../../../../lib/mongodb';
import cloudinary from '../../../../../../lib/cloudinary';

const JWT_SECRET = process.env.JWT_SECRET;

export async function PUT(req, { params }) {
  const { id } = params;
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  }

  const token = authHeader.split(' ')[1];

  try {
    await connectToDatabase();

    const decoded = verify(token, JWT_SECRET);
    if (decoded.userId !== id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const updates = {};
    
    // working code 
    if (formData.has('profilepic')) {
      const profilepicFile = formData.get('profilepic');
      const profilepicBuffer = await profilepicFile.arrayBuffer();
      const profilepicBase64 = Buffer.from(profilepicBuffer).toString('base64');
      const profilePicUpload = await cloudinary.uploader.upload(`data:${profilepicFile.type};base64,${profilepicBase64}`);
      updates.profilepic = profilePicUpload.secure_url;
    }

    if (formData.has('qr')) {
      const qrFile = formData.get('qr');
      const qrBuffer = await qrFile.arrayBuffer();
      const qrBase64 = Buffer.from(qrBuffer).toString('base64');
      const qrUpload = await cloudinary.uploader.upload(`data:${qrFile.type};base64,${qrBase64}`);
      updates.qr = qrUpload.secure_url;
    }

    if (formData.has('phoneNumber')) updates.phoneNumber = formData.get('phoneNumber');
    if (formData.has('kycStatus')) updates.kycStatus = formData.get('kycStatus');
    if (formData.has('address1')) updates.address1 = formData.get('address1');
    if (formData.has('address2')) updates.address2 = formData.get('address2');
    if (formData.has('state')) updates.state = formData.get('state');
    if (formData.has('pincode')) updates.pincode = formData.get('pincode');
    if (formData.has('bankname')) updates.bankname = formData.get('bankname');
    if (formData.has('accountnumbar')) updates.accountnumbar = formData.get('accountnumbar');
    if (formData.has('ifcecode')) updates.ifcecode = formData.get('ifcecode');
    if (formData.has('bankbranch')) updates.bankbranch = formData.get('bankbranch');
    if (formData.has('bankfulladdress')) updates.bankfulladdress = formData.get('bankfulladdress');
    if (formData.has('realname')) updates.realname = formData.get('realname');
    if (formData.has('upiid')) updates.upiid = formData.get('upiid');

    let profileData = await Profile.findOneAndUpdate({ user: id }, updates, { new: true });

    if (!profileData) {
      profileData = new Profile({
        user: id,
        ...updates,
      });
      await profileData.save();
    }

    return NextResponse.json(profileData, { status: 200 });
  } catch (err) {
    console.error('Error updating profile:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}




