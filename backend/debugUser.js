import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@aiauthority.com' }).lean();
  console.log(user);
  process.exit(0);
};

run();