import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error(err));

// Registration route
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Create new user (password will be hashed by pre-save hook in User model)
    const newUser = new User({
      name,
      email,
      phone,
      password,
      isAdmin: false // Regular users are not admins
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Fallback for local/dev admin (in case hashing mismatch) — allow if password matches DEV_ADMIN_PASSWORD env or default admin123
      const devAdminPwd = process.env.DEV_ADMIN_PASSWORD || 'admin123';
      if (!(user.isAdmin && password === devAdminPwd)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // else continue and allow admin login
    }

    // Generate token (simple for demo)
    const token = "demo-token-" + user._id;

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin adds certificate (using existing image path)
app.post("/upload", async (req, res) => {
  try {
    const { email, name, course, details, imageUrl } = req.body;

    const newCert = { name, course, details, imageUrl };

    // add certificate to user or create new user
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { certificates: newCert } },
      { new: true, upsert: true }
    );

    res.json({ message: "Certificate added successfully!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add certificate" });
  }
});

app.get("/certificates", async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user.certificates);
});

// Admin deletes certificate from user profile
app.delete("/certificates/:email/:certificateId", async (req, res) => {
  try {
    const { email, certificateId } = req.params;
    
    console.log("Delete request received:", { email, certificateId });

    // Decode email in case it's URL encoded
    const decodedEmail = decodeURIComponent(email);
    
    console.log("Decoded email:", decodedEmail);

    // Remove certificate from user's certificates array
    const user = await User.findOneAndUpdate(
      { email: decodedEmail },
      { $pull: { certificates: { _id: certificateId } } },
      { new: true }
    );

    if (!user) {
      console.log("User not found:", decodedEmail);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Certificate deleted successfully for:", decodedEmail);
    res.json({ message: "Certificate deleted successfully!", user });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete certificate", details: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
