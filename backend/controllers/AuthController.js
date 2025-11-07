import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER USER
export const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check for existing user (email or phone)
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing)
      return res.status(400).json({ message: "User with this email or phone already exists" });

    // Create new user
    const user = await User.create({ name, email, phone, password });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { 
        id: user._id,
        isAdmin: user.isAdmin 
      }, 
      "mySuperSecretKey123", 
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
