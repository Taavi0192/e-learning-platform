import React from "react";

const Progress = ({ courses }) => {
  // Calculate overall progress
  const overallProgress = 
    courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Learning Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Overall Progress</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    All Courses
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-blue-100">
                <div style={{ width: `${overallProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#19a4db]"></div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="text-green-800 font-medium text-sm">Completed</h4>
                <p className="text-2xl font-bold text-green-600">1</p>
                <p className="text-xs text-green-700">course</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="text-blue-800 font-medium text-sm">In Progress</h4>
                <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
                <p className="text-xs text-blue-700">courses</p>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Learning Time</h3>
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-800">42h</p>
                <p className="text-gray-500 mt-1">Total learning time</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg font-semibold text-gray-800">12h</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg font-semibold text-gray-800">28h</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg font-semibold text-gray-800">104</p>
                <p className="text-xs text-gray-500">Activities</p>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-4">Course Progress</h3>
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{course.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.progress < 30 ? 'bg-red-100 text-red-800' : 
                  course.progress < 70 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {course.progress}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#19a4db] h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Started: April 5, 2023</span>
                <span>Last activity: 2 days ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress; 