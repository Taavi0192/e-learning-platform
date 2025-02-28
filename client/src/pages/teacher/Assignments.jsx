import React, { useState } from "react";
import { FiPlus, FiCalendar, FiUsers, FiFile, FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const Assignments = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  // Mock assignments data - would come from API in real app
  const assignments = [
    {
      id: 1,
      title: "React Components Assignment",
      courseName: "Introduction to React",
      dueDate: "May 20, 2023",
      totalStudents: 28,
      submissionCount: 15,
      status: "Active"
    },
    {
      id: 2,
      title: "JavaScript Closures Quiz",
      courseName: "Advanced JavaScript",
      dueDate: "May 18, 2023",
      totalStudents: 18,
      submissionCount: 10,
      status: "Active"
    },
    {
      id: 3,
      title: "User Interface Mockup",
      courseName: "UX/UI Design Fundamentals",
      dueDate: "May 25, 2023",
      totalStudents: 35,
      submissionCount: 8,
      status: "Active"
    },
    {
      id: 4,
      title: "HTML/CSS Final Project",
      courseName: "Web Development Basics",
      dueDate: "April 30, 2023",
      totalStudents: 42,
      submissionCount: 42,
      status: "Completed"
    },
    {
      id: 5,
      title: "React Router Implementation",
      courseName: "Introduction to React",
      dueDate: "April 28, 2023",
      totalStudents: 28,
      submissionCount: 25,
      status: "Completed"
    }
  ];
  
  const filteredAssignments = assignments.filter(assignment => 
    activeTab === "all" || assignment.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Assignments</h2>
          <button className="flex items-center px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm">
            <FiPlus className="mr-2" />
            Create Assignment
          </button>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all" 
                  ? "border-[#19a4db] text-[#19a4db]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab("active")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "active" 
                  ? "border-[#19a4db] text-[#19a4db]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab("draft")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "draft" 
                  ? "border-[#19a4db] text-[#19a4db]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Draft
            </button>
            <button 
              onClick={() => setActiveTab("completed")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "completed" 
                  ? "border-[#19a4db] text-[#19a4db]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Completed
            </button>
          </nav>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submissions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssignments.map((assignment, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <FiFile className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-1.5 h-4 w-4 text-gray-400" />
                      {assignment.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <div className="text-sm text-gray-900">{assignment.submissionCount}/{assignment.totalStudents}</div>
                        <div className="text-xs text-gray-500">Submissions</div>
                      </div>
                      <div className="relative w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`absolute left-0 h-full ${
                            (assignment.submissionCount / assignment.totalStudents) >= 0.8 ? 'bg-green-500' : 
                            (assignment.submissionCount / assignment.totalStudents) >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      assignment.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      assignment.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <button className="text-gray-400 hover:text-[#19a4db]">
                        <FiEye size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-[#19a4db]">
                        <FiEdit size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredAssignments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No assignments found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assignments; 