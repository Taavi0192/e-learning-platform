import React from "react";
import { motion } from "framer-motion";

const Courses = ({ courses }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Courses</h2>
          <div className="flex space-x-2">
            <select className="text-sm border border-gray-200 rounded-lg p-2">
              <option>All Courses</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm">
              Browse Courses
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {courses.map(course => (
            <motion.div 
              key={course.id}
              whileHover={{ y: -5 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="text-gray-600 mt-1">Instructor: {course.instructor}</p>
                  <p className="text-gray-500 mt-1 text-sm">{course.schedule}</p>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Web Development
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      Frontend
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg text-sm mb-2">
                    Next class: {course.nextDate}
                  </div>
                  
                  <div className="w-full md:w-64 mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#19a4db] h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium">
                  Continue Learning
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  View Materials
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  Discussion Forum
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 