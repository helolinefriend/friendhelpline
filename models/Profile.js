// updateted profile 
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profilepic: { type: String }, // Change `profile` to `profilepic` for clarity
  phoneNumber: { type: String,  },
  kycStatus: { type: String, default: 'non kyc' },
  address1: { type: String },
  address2: { type: String },
  state: { type: String },
  pincode: { type: String },
  bankname: { type: String },
  accountnumbar: { type: String,  },
  ifcecode: { type: String },
  bankbranch: { type: String },
  bankpincode: { type: String },
  bankfulladdress: { type: String },
  realname: { type: String },
  qr: { type: String },
  upiid: { type: String,  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
