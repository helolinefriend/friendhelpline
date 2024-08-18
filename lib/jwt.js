import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    referrerId: user.referrerId
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};
