import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Owner from "../models/ownerModel.js";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (owner) => {
    return jwt.sign(
        { id: owner._id, email: owner.email, role: "owner" },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

const generateRefreshToken = (owner) => {
    return jwt.sign(
        { id: owner._id, email: owner.email, role: "owner" },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(owner);
        const refreshToken = generateRefreshToken(owner);

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

export const logoutOwner = (req, res) => {
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

            const owner = await Owner.findById(decoded.id);
            if (!owner) {
                return res.status(404).json({ message: "Owner not found" });
            }

            const newAccessToken = generateAccessToken(owner);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const getOwnerDashboard = async (req, res) => {
    try {
        res.json({ message: `Welcome Owner ${req.user.email}` });
    } catch (error) {
        res.status(500).json({ message: "Error loading dashboard" });
    }
};
