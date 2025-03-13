import React, { useState, useEffect } from "react";
import { FiUsers, FiCalendar, FiEdit, FiTrash2, FiPlus, FiBook } from "react-icons/fi";
import AddCourseModal from "./components/AddCourseModal"; 
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredCourses = activeFilter === "all" 
    ? courses 
    : courses.filter(course => course.status.toLowerCase() === activeFilter);

  useEffect(() => {
    // Mock data for teacher courses - in a real app, this would come from an API
    const mockCourses = [
      {
        id: 1,
        title: "Introduction to React",
        students: 42,
        level: "Beginner",
        lastUpdated: "2023-05-15",
        status: "Active",
      },
      {
        id: 2,
        title: "Advanced JavaScript",
        students: 28,
        level: "Advanced",
        lastUpdated: "2023-04-20",
        status: "Active",
      },
      {
        id: 3,
        title: "UX/UI Design Fundamentals",
        students: 36,
        level: "Intermediate",
        lastUpdated: "2023-05-01",
        status: "Active",
      }
    ];
    
    setCourses(mockCourses);
    setLoading(false);
  }, []);

  const handleAddCourse = (courseData) => {
    // Here you would typically send the data to your API
    console.log("Form submitted:", courseData);
    
    // Close modal
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  if (loading) {
    return <p className="text-gray-600 text-center mt-10">Loading courses...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Courses</h2>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            {/* <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setActiveFilter("all")} 
                className={`px-4 py-2 text-sm ${activeFilter === "all" ? "bg-[#19a4db] text-white" : "bg-white text-gray-700"}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter("active")} 
                className={`px-4 py-2 text-sm ${activeFilter === "active" ? "bg-[#19a4db] text-white" : "bg-white text-gray-700"}`}
              >
                Active
              </button>
              <button 
                onClick={() => setActiveFilter("upcoming")} 
                className={`px-4 py-2 text-sm ${activeFilter === "upcoming" ? "bg-[#19a4db] text-white" : "bg-white text-gray-700"}`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setActiveFilter("completed")} 
                className={`px-4 py-2 text-sm ${activeFilter === "completed" ? "bg-[#19a4db] text-white" : "bg-white text-gray-700"}`}
              >
                Completed
              </button>
            </div> */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm"
            >
              <FiPlus className="mr-2" />
              Add Course
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <motion.tr 
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/teacher-dashboard/courses/manage?id=${course.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import the Course Modal Component */}
      <AddCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddCourse} 
      />
    </div>
  );
};

export default Courses; 