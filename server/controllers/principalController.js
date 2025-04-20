import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Principal from "../models/principalModel.js";


dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (principal) => {
    return jwt.sign(
        { id: principal._id, email: principal.email, role: "principal" },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

const generateRefreshToken = (principal) => {
    return jwt.sign(
        { id: principal._id, email: principal.email, role: "principal" },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const loginPrincipal = async (req, res) => {
    try {
        const { email, password } = req.body;
        const principal = await Principal.findOne({ email });
        if (!principal) {
            return res.status(404).json({ message: "Principal not found" });
        }

        const isMatch = await bcrypt.compare(password, principal.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(principal);
        const refreshToken = generateRefreshToken(principal);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const logoutPrincipal = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out successfully" });
};

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired refresh token" });
            }

            const principal = await Principal.findById(decoded.id);
            if (!principal) {
                return res.status(404).json({ message: "Principal not found" });
            }

            const newAccessToken = generateAccessToken(principal);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const getPrincipalDashboard = async (req, res) => {
    try {
        res.json({ message: `Welcome Principal ${req.user.email}` });
    } catch (error) {
        res.status(500).json({ message: "Error loading dashboard" });
    }
};

