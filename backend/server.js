import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import paymentRoutes from "./routes/Payment.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    credentials: true,
  })
);

// ✅ Ensure uploads folder exists (Render can start with an empty FS)
const uploadDir = path.join(__dirname, "uploads/certificates");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/certificates/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error("Only PDF, JPG, JPEG, and PNG files are allowed"));
  },
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// --- Registration Route ---
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists with this email" });

    const existingPhone = await User.findOne({ phone });
    if (existingPhone)
      return res.status(400).json({ message: "Phone number already registered" });

    const newUser = new User({
      name,
      email,
      phone,
      password,
      isAdmin: false,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// --- Login Route ---
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const devAdminPwd = process.env.DEV_ADMIN_PASSWORD || "admin123";
      if (!(user.isAdmin && password === devAdminPwd)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    const token = "demo-token-" + user._id;

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Upload Certificate Route ---
app.post("/upload-certificate", (req, res) => {
  upload.single("certificateFile")(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError)
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      else if (err) return res.status(400).json({ error: err.message });

      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const { email, name, company, course, details, certificationType } = req.body;
      if (!email || !name || !course || !details)
        return res.status(400).json({ error: "All fields are required" });

      const imageUrl = `/uploads/certificates/${req.file.filename}`;
      const newCert = { 
        name, 
        company: company || "-",
        course, 
        details, 
        imageUrl,
        certificationType: certificationType || "Certified Enterprise AI Architect",
        issuedDate: new Date()
      };

      const user = await User.findOneAndUpdate(
        { email },
        { $push: { certificates: newCert } },
        { new: true, upsert: true }
      );

      res.json({
        message: "Certificate uploaded and added successfully!",
        user,
        fileUrl: imageUrl,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload certificate" });
    }
  });
});

// --- Add Certificate (existing image path) ---
app.post("/upload", async (req, res) => {
  try {
    const { email, name, course, details, imageUrl } = req.body;
    const newCert = { name, course, details, imageUrl };

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

// --- Get Certificates ---
app.get("/certificates", async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user.certificates);
});

// --- Get All Certificates (for Certified Members page) ---
app.get("/api/all-certificates", async (req, res) => {
  try {
    const users = await User.find({ "certificates.0": { $exists: true } });
    
    const allCertificates = [];
    users.forEach(user => {
      user.certificates.forEach(cert => {
        allCertificates.push({
          userName: cert.name || user.name,
          company: cert.company || "-",
          email: user.email,
          course: cert.course,
          details: cert.details,
          certificateUrl: cert.imageUrl,
          certificationType: cert.certificationType || "Certified Enterprise AI Architect",
          dateCertified: cert.issuedDate || cert.createdAt || new Date(),
        });
      });
    });
    
    res.json(allCertificates);
  } catch (error) {
    console.error("Error fetching all certificates:", error);
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
});

// --- Delete Certificate ---
app.delete("/certificates/:email/:certificateId", async (req, res) => {
  try {
    const { email, certificateId } = req.params;
    const decodedEmail = decodeURIComponent(email);

    const user = await User.findOneAndUpdate(
      { email: decodedEmail },
      { $pull: { certificates: { _id: certificateId } } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Certificate deleted successfully!", user });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete certificate" });
  }
});

// --- Payment Routes ---
app.use("/api/payment", paymentRoutes);

// ✅ Dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
