import React from "react";
import { motion } from "framer-motion";

const Courses = () => {
  // Mock data for courses (since it's no longer passed from parent)
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "Sarah Johnson",
      progress: 65,
      nextLesson: "Component Lifecycle",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Michael Chen",
      progress: 40,
      nextLesson: "Promises and Async/Await",
    },
    {
      id: 3,
      title: "UX/UI Design Fundamentals",
      instructor: "Priya Sharma",
      progress: 85,
      nextLesson: "User Testing Methods",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Courses</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => (
            <motion.div 
              key={course.id}
              whileHover={{ y: -5 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="text-gray-600 mt-1">Instructor: {course.instructor}</p>
                  <p className="text-gray-500 mt-1 text-sm">{course.nextLesson}</p>
                  
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
                  
                  <div className="w-full md:w-64 mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
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