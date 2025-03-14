import express from "express";
import {
  createAssignment,
  getTeacherAssignments,
  getCourseAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  gradeSubmission,
} from "../controllers/assignmentController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Teacher routes
router.post(
  "/create",
  verifyAccessToken,
  upload.single("attachmentFile"),
  createAssignment
);

router.get("/teacher", verifyAccessToken, getTeacherAssignments);

router.get("/course/:courseId", verifyAccessToken, getCourseAssignments);

router.get("/:assignmentId", verifyAccessToken, getAssignmentById);

router.put(
  "/:assignmentId",
  verifyAccessToken,
  upload.single("attachmentFile"),
  updateAssignment
);

router.delete("/:assignmentId", verifyAccessToken, deleteAssignment);

// Student routes
router.post(
  "/:assignmentId/submit",
  verifyAccessToken,
  upload.single("submissionFile"),
  submitAssignment
);

// Grading route
router.post(
  "/:assignmentId/submissions/:submissionId/grade",
  verifyAccessToken,
  gradeSubmission
);

export default router;
