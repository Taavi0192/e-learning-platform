import Assignment from "../models/assignmentModel.js";
import Course from "../models/courseModel.js";

// Create a new assignment
export const createAssignment = async (req, res) => {
  try {
    const teacherId = req.user.id; // Get teacher ID from authenticated user
    const { title, courseId, courseName, deadline, description } = req.body;

    // Validate required fields
    if (!title || !courseId || !courseName || !deadline) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create new assignment
    const newAssignment = new Assignment({
      title,
      course: courseId,
      courseName,
      deadline,
      description,
      teacher: teacherId,
      attachmentFile: req.file ? req.file.path : null,
    });

    await newAssignment.save();

    // Add assignment reference to the course
    course.assignments.push(newAssignment._id);
    await course.save();

    return res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all assignments for a teacher
export const getTeacherAssignments = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const assignments = await Assignment.find({ teacher: teacherId })
      .populate("course", "courseName courseCode")
      .sort({ createdAt: -1 });

    return res.status(200).json({ assignments });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all assignments for a course
export const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate courseId
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Get assignments with populated teacher information and submission counts
    const assignments = await Assignment.find({ course: courseId })
      .populate("teacher", "name email")
      .sort({ deadline: 1 });

    // Add submission count and other useful information
    const enhancedAssignments = assignments.map((assignment) => {
      const assignmentObj = assignment.toObject();
      assignmentObj.submissionCount = assignment.submissions.length;
      assignmentObj.isOverdue = new Date(assignment.deadline) < new Date();

      // Don't send all submission details in the list view for privacy/performance
      delete assignmentObj.submissions;

      return assignmentObj;
    });

    return res.status(200).json({
      message: "Assignments retrieved successfully",
      courseId,
      courseName: course.courseName,
      assignmentCount: enhancedAssignments.length,
      assignments: enhancedAssignments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get a single assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId)
      .populate("course", "courseName courseCode")
      .populate("teacher", "name email");

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json({ assignment });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update an assignment
export const updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const teacherId = req.user.id;
    const { title, deadline, description } = req.body;

    // Find the assignment
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if the teacher owns this assignment
    if (assignment.teacher.toString() !== teacherId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this assignment" });
    }

    // Update fields
    assignment.title = title || assignment.title;
    assignment.deadline = deadline || assignment.deadline;
    assignment.description = description || assignment.description;

    // Update file if provided
    if (req.file) {
      assignment.attachmentFile = req.file.path;
    }

    await assignment.save();

    return res.status(200).json({
      message: "Assignment updated successfully",
      assignment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete an assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const teacherId = req.user.id;

    // Find the assignment
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if the teacher owns this assignment
    if (assignment.teacher.toString() !== teacherId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this assignment" });
    }

    // Remove assignment reference from the course
    await Course.findByIdAndUpdate(assignment.course, {
      $pull: { assignments: assignmentId },
    });

    // Delete the assignment
    await Assignment.findByIdAndDelete(assignmentId);

    return res.status(200).json({
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Student submission endpoints
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "Submission file is required" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if deadline has passed
    if (new Date(assignment.deadline) < new Date()) {
      return res
        .status(400)
        .json({ message: "Assignment deadline has passed" });
    }

    // Check if student has already submitted
    const existingSubmission = assignment.submissions.find(
      (sub) => sub.student.toString() === studentId
    );

    if (existingSubmission) {
      // Update existing submission
      existingSubmission.submissionFile = req.file.path;
      existingSubmission.submissionDate = new Date();
    } else {
      // Add new submission
      assignment.submissions.push({
        student: studentId,
        submissionFile: req.file.path,
      });
    }

    await assignment.save();

    return res.status(200).json({
      message: "Assignment submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Grade a submission
export const gradeSubmission = async (req, res) => {
  try {
    const { assignmentId, submissionId } = req.params;
    const teacherId = req.user.id;
    const { grade, feedback } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if the teacher owns this assignment
    if (assignment.teacher.toString() !== teacherId) {
      return res
        .status(403)
        .json({ message: "Not authorized to grade this assignment" });
    }

    // Find the submission
    const submission = assignment.submissions.id(submissionId);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Update grade and feedback
    submission.grade = grade;
    submission.feedback = feedback;

    await assignment.save();

    return res.status(200).json({
      message: "Submission graded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
