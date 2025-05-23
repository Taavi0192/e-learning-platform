import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import FineSecurity from "../models/FineSecurity.js";
import Fee from "../models/Fee.js";

// Generate Tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
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
    console.log(username);
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Student.create({
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

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!student.isApproved) {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(student);
    const refreshToken = generateRefreshToken(student);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.json({ message: "Login successful", accessToken, student });
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
      const student = await Student.findById(decoded.id);
      if (!student) {
        return res.status(404).json({ message: "student not found" });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(student);

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// GET all fees
export const getStudentFees = async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.params.studentId });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH pay fee
export const markFeeAsPaid = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
        req.params.feeId,
        { status: "paid" },
        { new: true }
    );
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all fines
export const getStudentFines = async (req, res) => {
  try {
    const fines = await FineSecurity.find({ studentId: req.params.studentId });
    res.json(fines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH pay fine
export const markFineAsPaid = async (req, res) => {
  try {
    const fine = await FineSecurity.findByIdAndUpdate(
        req.params.fineId,
        { status: "paid" },
        { new: true }
    );
    res.json(fine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeeDetail = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.feeId);
    if (!fee) return res.status(404).json({ message: "Fee not found." });
    res.json(fee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};