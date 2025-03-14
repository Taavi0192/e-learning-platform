import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Course from "../models/courseModel.js";
import multer from "multer";

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const addCourse = async (req, res) => {
  try {
    const teacherId = req.user.id; // Assuming user ID is stored in req.user
    const {
      name: courseName,
      code: courseCode,
      maxStudents,
      price,
      duration,
      difficultyLevel: difficulty,
      category,
      instructorName,
      description,
    } = req.body;

    console.log(req.body);
    const thumbnail = req.file ? req.file.path : null;

    // Validate required fields
    if (
      !courseName ||
      !courseCode ||
      !maxStudents ||
      !price ||
      !duration ||
      !difficulty ||
      !category ||
      !instructorName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new course
    const newCourse = await Course.create({
      courseName,
      courseCode,
      maxStudents,
      price,
      duration,
      difficulty,
      category,
      instructorName,
      description,
      thumbnail,
      teacher: teacherId,
    });

    // Add the course to the teacher's list of courses
    const teacher = await Teacher.findById(teacherId);
    teacher.courses.push(newCourse._id);
    await teacher.save();

    return res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const addModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newModule = { title, description, lessons: [] };
    course.modules.push(newModule);
    await course.save();

    return res
      .status(201)
      .json({ message: "Module added successfully", module: newModule });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const addLesson = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, duration, description, materialType, materialUrl } =
      req.body;

    console.log("Received lesson data:", {
      title,
      duration,
      description,
      materialType,
      materialUrl,
      file: req.file,
    });

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Handle file upload
    let material = materialUrl;
    if (req.file) {
      material = req.file.path; // Assuming multer is configured to store files with a path
    }

    const newLesson = { title, duration, description, material, materialType };
    module.lessons.push(newLesson);
    await course.save();

    return res
      .status(201)
      .json({ message: "Lesson added successfully", lesson: newLesson });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getCoursesByTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id; // Assuming user ID is stored in req.user

    const courses = await Course.find({ teacher: teacherId });
    if (!courses) {
      return res
        .status(404)
        .json({ message: "No courses found for this teacher" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const manageCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (req.method === "GET") {
      return res.status(200).json({ course });
    }

    if (req.method === "PUT") {
      const {
        name: courseName,
        code: courseCode,
        maxStudents,
        price,
        duration,
        difficultyLevel: difficulty,
        category,
        instructorName,
        description,
      } = req.body;

      // Update course fields
      course.courseName = courseName || course.courseName;
      course.courseCode = courseCode || course.courseCode;
      course.maxStudents = maxStudents || course.maxStudents;
      course.price = price || course.price;
      course.duration = duration || course.duration;
      course.difficulty = difficulty || course.difficulty;
      course.category = category || course.category;
      course.instructorName = instructorName || course.instructorName;
      course.description = description || course.description;

      await course.save();
      return res
        .status(200)
        .json({ message: "Course updated successfully", course });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming user ID is stored in req.user

    // Fetch the student's enrolled courses
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Get all courses
    const allCourses = await Course.find();

    // Filter out courses that the student is already enrolled in
    const availableCourses = allCourses.filter(
      (course) => !student.enrolledCourses.includes(course._id)
    );

    return res.status(200).json({ courses: availableCourses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming user ID is stored in req.user
    const { courseId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    student.enrolledCourses.push(courseId);
    await student.save();

    return res.status(200).json({ message: "Enrolled in course successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming user ID is stored in req.user

    const student = await Student.findById(studentId).populate(
      "enrolledCourses"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ courses: student.enrolledCourses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
