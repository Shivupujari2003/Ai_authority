import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const email = process.argv[2];
if (!email) {
  console.error('Usage: node viewUser.js user@example.com');
  process.exit(1);
}

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email }).lean();
  if (!user) {
    console.log('User not found');
    process.exit(0);
  }
  console.log(JSON.stringify(user, null, 2));
  process.exit(0);
};

run();