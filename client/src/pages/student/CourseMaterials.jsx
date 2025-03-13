import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseMaterials = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const storedCourse = sessionStorage.getItem("selectedCourse");

    if (storedCourse) {
      setCourse(JSON.parse(storedCourse));
    }
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold">
        {course ? `${course.title} - Materials` : "No course available"}
      </h2>

      {course ? (
        <>
          <p className="text-gray-600">Instructor: {course.instructor}</p>

          <div className="mt-6">
            <h3 className="text-lg font-bold">Available Materials</h3>
            <ul className="mt-2">
              <li className="p-2 border-b">📹 Video: Introduction to {course.title}</li>
              <li className="p-2 border-b">📄 PDF: {course.title} Guide</li>
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-4">Please select a course from the dashboard.</p>
      )}

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
