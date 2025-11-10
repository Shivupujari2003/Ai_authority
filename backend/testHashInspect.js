import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@aiauthority.com' }).lean();
  const pw = user.password;
  console.log('json:', JSON.stringify(pw));
  console.log('length:', pw.length);
  // show char codes with indices
  for (let i = 0; i < pw.length; i++) {
    if (i < 80) process.stdout.write(`${i}:${pw.charCodeAt(i)} `);
    else if (i === 80) { process.stdout.write('\n...'); break; }
  }
  process.exit(0);
};

run();