import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import Accountant from "../models/accountantModel.js";
import Principal from "../models/principalModel.js";
import Owner from "../models/ownerModel.js";

export const verifyAccessToken = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("✅ Decoded token:", decoded);
        const userId = decoded.id;

        let user =
            (await Admin.findById(userId)) ||
            (await Student.findById(userId)) ||
            (await Teacher.findById(userId)) ||
            (await Accountant.findById(userId)) ||
            (await Principal.findById(userId)) ||
            (await Owner.findById(userId));

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = {
            id: user._id,
            email: user.email,
            role: decoded.role, // ✅ ensures authorizeRoles will work
        };

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};
