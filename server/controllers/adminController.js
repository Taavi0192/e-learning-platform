import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Generate Access Token (Short-Lived)
const generateAccessToken = (admin) => {
  return jwt.sign({ id: admin._id, email: admin.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// Generate Refresh Token (Long-Lived)
const generateRefreshToken = (admin) => {
  return jwt.sign({ id: admin._id, email: admin.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate tokens
    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    // Store refresh token in HTTP-Only Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Admin Logout (Clear Refresh Token)
export const logoutAdmin = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
};

// Refresh Token Endpoint
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token" });
      }

      // Fetch the admin from DB
      const admin = await Admin.findById(decoded.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(admin);

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
