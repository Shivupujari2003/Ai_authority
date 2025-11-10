import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

async function listAllUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const users = await User.find({}, 'email name certificates');
    
    if (users.length === 0) {
      console.log("\nNo users found in database.");
    } else {
      console.log(`\n📋 Found ${users.length} users:\n`);
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email} - ${user.name || 'No name'}`);
        console.log(`   Certificates: ${user.certificates.length}`);
        if (user.certificates.length > 0) {
          user.certificates.forEach((cert, i) => {
            console.log(`     ${i + 1}. ${cert.name} - ${cert.course}`);
          });
        }
        console.log();
      });
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

listAllUsers();
