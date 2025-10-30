import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  
  phone: { 
    type: String, 
    required: true, 
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    unique: true,
  },
  isAdmin: { type: Boolean, default: false },

  certificates: [
    {
      name: String,
      course: String,
      details: String,
      imageUrl: String,
      issuedDate: { type: Date, default: Date.now }
    }
  ],

  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
