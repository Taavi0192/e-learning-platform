import React, { useState } from "react";
import { FiUsers, FiCalendar, FiEdit, FiTrash2, FiPlus, FiBook } from "react-icons/fi";

const Courses = ({ courses }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredCourses = activeFilter === "all" 
    ? courses 
    : courses.filter(course => course.status.toLowerCase() === activeFilter);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Courses</h2>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
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
            </div>
            <button className="flex items-center px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm">
              <FiPlus className="mr-2" />
              Add Course
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredCourses.map((course, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
              <div className="flex flex-wrap justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <span className={`ml-3 text-xs font-medium px-2 py-1 rounded-full ${
                      course.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : course.status === "Upcoming"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">Code: {course.code}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {course.department}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end space-y-2">
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-[#19a4db]">
                      <FiEdit size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-gray-500">
                      <FiUsers className="mr-1" />
                      <span className="text-sm">{course.studentsCount} students</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FiCalendar className="mr-1" />
                      <span className="text-sm">{course.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex justify-center items-center px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium">
                  Manage Course
                </button>
                <button className="flex justify-center items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  View Materials
                </button>
                <button className="flex justify-center items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  Student Performance
                </button>
              </div>
            </div>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBook className="text-gray-400 w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No Courses Found</h3>
              <p className="text-gray-500 mb-4">
                {activeFilter === "all" 
                  ? "You haven't created any courses yet." 
                  : `You don't have any ${activeFilter} courses.`}
              </p>
              <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium">
                Create Your First Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses; 