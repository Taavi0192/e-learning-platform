import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    maxStudents: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
