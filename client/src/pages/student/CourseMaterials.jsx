import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseMaterials = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const storedCourse = sessionStorage.getItem("selectedCourse");
    console.log("Stored course:", storedCourse);

    if (storedCourse) {
      try {
        const parsedCourse = JSON.parse(storedCourse);
        console.log("Parsed course:", parsedCourse);
        setCourse(parsedCourse);
      } catch (error) {
        console.error("Error parsing course data:", error);
      }
    } else {
      console.log("No course found in session storage");
    }
  }, []);

  if (!course) {
    return (
      <div className="p-6 bg-white shadow-md rounded-xl">
        <p className="text-gray-500">Loading course materials...</p>
        <button 
          onClick={() => navigate("/student-dashboard/courses")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold">
        {course.title} - Materials
      </h2>

      <p className="text-gray-600">Instructor: {course.instructor}</p>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Available Materials</h3>
        <ul className="mt-2">
          <li className="p-2 border-b">📹 Video: Introduction to {course.title}</li>
          <li className="p-2 border-b">📄 PDF: {course.title} Guide</li>
        </ul>
      </div>

      <button 
        onClick={() => navigate("/student-dashboard/courses")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Back to Courses
      </button>
    </div>
  );
};

export default CourseMaterials;
