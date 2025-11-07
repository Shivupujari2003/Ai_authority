import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@aiauthority.com' }).lean();
  console.log('stored hash:', user.password);
  const match = await bcrypt.compare('admin123', user.password);
  console.log('bcrypt.compare result:', match);
  process.exit(0);
};

run();