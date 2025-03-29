import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";
import Course from "../models/courseModel.js";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Generate Access Token (Short-Lived)
const generateAccessToken = (admin) => {
  return jwt.sign({ id: admin._id, email: admin.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
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

// Approve or reject a teacher
export const updateTeacherStatus = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    if (!["approve", "reject"].includes(action)) {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'approve' or 'reject'" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (action === "approve") {
      teacher.isApproved = true;
      teacher.isRejected = false;
    } else {
      teacher.isApproved = false;
      teacher.isRejected = true;
    }

    await teacher.save();

    res.status(200).json({
      message: `Teacher ${
        action === "approve" ? "approved" : "rejected"
      } successfully`,
      teacher: {
        _id: teacher._id,
        username: teacher.username,
        email: teacher.email,
        isApproved: teacher.isApproved,
        isRejected: teacher.isRejected,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Approve or reject a student
export const updateStudentStatus = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    if (!["approve", "reject"].includes(action)) {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'approve' or 'reject'" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (action === "approve") {
      student.isApproved = true;
      student.isRejected = false;
    } else {
      student.isApproved = false;
      student.isRejected = true;
    }

    await student.save();

    res.status(200).json({
      message: `Student ${
        action === "approve" ? "approved" : "rejected"
      } successfully`,
      student: {
        _id: student._id,
        username: student.username,
        email: student.email,
        isApproved: student.isApproved,
        isRejected: student.isRejected,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all courses for admin
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher", "username email")
      .lean();

    // Add additional information to each course
    const coursesWithDetails = await Promise.all(
      courses.map(async (course) => {
        // Count enrolled students
        const enrolledStudentsCount = await Student.countDocuments({
          enrolledCourses: { $in: [course._id] },
        });

        return {
          ...course,
          enrolledStudents: enrolledStudentsCount,
          // Add default status if not present
          status:
            course.status ||
            (new Date(course.startDate) > new Date()
              ? "upcoming"
              : course.isCompleted
              ? "completed"
              : "active"),
        };
      })
    );

    res.status(200).json({ courses: coursesWithDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
