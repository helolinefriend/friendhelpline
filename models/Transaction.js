// import mongoose from 'mongoose';

// const TransactionSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   amount: { type: String },
//   sreenshort: { type: String },
//   referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   referrerUsername: { type: String },
//   referrerEmail: { type: String },
//   referrerPhoneNumber: { type: String },
//   referrerQR: { type: String },
//   referrerUpiId: { type: String },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);




// import mongoose from 'mongoose';

// const TransactionSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   amount: { type: String },
//   screenshot: { type: String },
//   referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   referrerUsername: { type: String },
//   referrerEmail: { type: String },
//   referrerPhoneNumber: { type: String },
//   referrerQR: { type: String },
//   referrerUpiId: { type: String },
//   paymentStatus: { type: String, default: 'not received' }, // 'not received', 'received'
//   adminUpdate: { type: String, default: 'pending' }, // 'pending', 'approved', 'rejected'
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);



import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: String },
  screenshot: { type: String },
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referrerUsername: { type: String },
  referrerEmail: { type: String },
  referrerPhoneNumber: { type: String },
  referrerQR: { type: String },
  referrerUpiId: { type: String },
  paymentStatus: { type: String, default: 'not received' }, // 'not received', 'received'
  adminUpdate: { type: String, default: 'pending' }, // 'pending', 'approved', 'rejected'
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
