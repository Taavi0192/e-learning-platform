import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getAllTeachers,
  getAllStudents,
  updateTeacherStatus,
  updateStudentStatus,
  getAllCourses,
} from "../controllers/adminController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAccessToken);

// Teacher and Student management routes
router.get("/teachers", verifyAccessToken, getAllTeachers);
router.get("/students", verifyAccessToken, getAllStudents);
router.put(
  "/teachers/:teacherId/status",
  verifyAccessToken,
  updateTeacherStatus
);
router.put(
  "/students/:studentId/status",
  verifyAccessToken,
  updateStudentStatus
);

// Course management routes
router.get("/courses", verifyAccessToken, getAllCourses);

export default router;
