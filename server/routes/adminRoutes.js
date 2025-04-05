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
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";  

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAccessToken);

router.get("/dashboard", verifyAccessToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.email}` });
});

// Teacher and Student management routes
router.get("/teachers", verifyAccessToken, getAllTeachers);
router.get("/students", verifyAccessToken, getAllStudents);
router.put(
  "/teachers/:teacherId/status",
  verifyAccessToken, authorizeRoles("admin"),
  updateTeacherStatus
);
router.put(
  "/students/:studentId/status",
  verifyAccessToken,
    authorizeRoles("admin"),
  updateStudentStatus
);

// Course management routes
router.get("/courses", verifyAccessToken, authorizeRoles("admin"), getAllCourses);

export default router;
