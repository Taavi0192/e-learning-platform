import express from "express";
import {
  addCourse,
  addModule,
  addLesson,
  getCoursesByTeacher,
  manageCourse,
  getAllCourses,
  enrollInCourse,
  getEnrolledCourses,
  getCourseModules,
  deleteLesson,
  getStudentsForCourse,
} from "../controllers/courseController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// course routes
router.post(
  "/addCourse",
  verifyAccessToken,
  upload.single("thumbnail"),
  addCourse
);
router.post("/:courseId/modules", verifyAccessToken, addModule);
router.post(
  "/:courseId/modules/:moduleId/lessons",
  verifyAccessToken,
  upload.single("material"), // Use multer to handle single file upload
  addLesson
);
router.get("/teacher/courses", verifyAccessToken, getCoursesByTeacher);
router
  .route("/:courseId/manage")
  .get(verifyAccessToken, manageCourse)
  .put(verifyAccessToken, manageCourse);
router.get("/getallcourses", verifyAccessToken, getAllCourses);
router.post("/enroll", verifyAccessToken, enrollInCourse);
router.get("/enrolled", verifyAccessToken, getEnrolledCourses);
router.get("/:courseId/modules", verifyAccessToken, getCourseModules);
router.delete(
  "/:courseId/modules/:moduleId/lessons/:lessonId",
  verifyAccessToken,
  deleteLesson
);
// Get students enrolled in a specific course
router.get("/:courseId/students", verifyAccessToken, getStudentsForCourse);

export default router;
