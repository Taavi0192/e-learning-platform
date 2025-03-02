import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate Tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Teacher.create({
      username,
      email,
      password: hashedPassword,
      role,
      isApproved: false, // Default to false until approved
    });

    return res
      .status(201)
      .json({ message: "User registered successfully. Awaiting approval." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password); 

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!teacher.isApproved) {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet." });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(teacher);
    const refreshToken = generateRefreshToken(teacher);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.json({ message: "Login successful", accessToken , teacher });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.json({ message: "Logged out successfully" });
};

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
      const teacher = await Teacher.findById(decoded.id);
      if (!teacher) {
        return res.status(404).json({ message: "teacher not found" });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(teacher);

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
