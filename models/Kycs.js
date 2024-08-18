import mongoose from 'mongoose';

const kycSchema = new mongoose.Schema({
 
 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aadhar: { type: String, unique: true, required: true, },
  pan: { type: String, unique: true, required: true, },
  aadharpic: { type: String, required: true, },
  panpic: { type: String, required: true, },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
 
export default mongoose.models.kycs || mongoose.model('kycs', kycSchema);
