import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const plain = 'admin123';
    const hash = await bcrypt.hash(plain, 10);
    const res = await User.findOneAndUpdate({ email: 'admin@aiauthority.com' }, { password: hash }, { new: true });
    console.log('Updated admin password, id=', res._id.toString());
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();