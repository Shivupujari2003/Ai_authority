import mongoose from 'mongoose';
import User from "./models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@aiauthority.com' });
    
    // Create new admin with simple password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@aiauthority.com',
      phone: '1234567890',
      password: hashedPassword,
      isAdmin: true
    });

    console.log('Admin user created successfully:', {
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();