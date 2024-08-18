

// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'user' },
//   key: { type: String, required: true, unique: true },
//   profile: { type: String,  unique: true },
//   subscriptionStatus: { type: String, default: 'active' },
//   subscriptionEndDate: { type: Date, default: null },

//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.User || mongoose.model('User', UserSchema);



import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  profile: { type: String  },
  subscriptionStatus: { type: String, default: 'active' },
  subscriptionEndDate: { type: Date, default: null },
  referralLink: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

