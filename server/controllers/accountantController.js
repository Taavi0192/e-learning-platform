import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Accountant from "../models/accountantModel.js";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Generate Access Token
const generateAccessToken = (accountant) => {
    return jwt.sign(
        { id: accountant._id, email: accountant.email, role: "accountant" },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

// Generate Refresh Token
const generateRefreshToken = (accountant) => {
    return jwt.sign(
        { id: accountant._id, email: accountant.email, role: "accountant" },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

// Accountant Login
export const loginAccountant = async (req, res) => {
    try {
        const { email, password } = req.body;

        const accountant = await Accountant.findOne({ email });
        if (!accountant) {
            return res.status(404).json({ message: "Accountant not found" });
        }

        const isMatch = await bcrypt.compare(password, accountant.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(accountant);
        const refreshToken = generateRefreshToken(accountant);

        // Store refresh token in httpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Accountant Logout
export const logoutAccountant = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out successfully" });
};

// Refresh Access Token
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

            const accountant = await Accountant.findById(decoded.id);
            if (!accountant) {
                return res.status(404).json({ message: "Accountant not found" });
            }

            const newAccessToken = generateAccessToken(accountant);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Protected Accountant Dashboard (optional)
export const getAccountantDashboard = async (req, res) => {
    try {
        res.json({
            message: `Welcome Accountant ${req.user.email}`,
        });
    } catch (error) {
        res.status(500).json({ message: "Error loading dashboard" });
    }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().select("-password");
        res.status(200).json({ teachers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password");
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};