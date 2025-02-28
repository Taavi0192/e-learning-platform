import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiFolder, FiCalendar, FiFileText, FiAward, FiMessageSquare, FiUser, FiLogOut, FiPieChart } from "react-icons/fi";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock data - would come from API in real app
  const teacherName = "Dr. Sarah Johnson";
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      students: 24,
      nextSession: "Today, 2:00 PM",
      location: "Online - Zoom Room A",
      completion: 65,
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      students: 18,
      nextSession: "Tomorrow, 10:00 AM",
      location: "Room 301, Tech Building",
      completion: 40,
    },
    {
      id: 3,
      title: "Frontend Frameworks",
      students: 15,
      nextSession: "Thursday, 1:00 PM",
      location: "Online - Zoom Room B",
      completion: 25,
    }
  ];
  
  const upcomingClasses = [
    {
      id: 1,
      course: "Introduction to React",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      location: "Online - Zoom Room A",
      students: 24,
    },
    {
      id: 2,
      course: "Web Development Bootcamp",
      date: "Tomorrow",
      time: "10:00 AM - 12:00 PM",
      location: "Room 301, Tech Building",
      students: 18,
    },
    {
      id: 3,
      course: "Frontend Frameworks",
      date: "Thursday",
      time: "1:00 PM - 3:00 PM",
      location: "Online - Zoom Room B",
      students: 15,
    }
  ];
  
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      courses: ["Introduction to React", "Frontend Frameworks"],
      attendance: 90,
      avgGrade: "A-"
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      email: "maya.r@example.com",
      courses: ["Introduction to React", "Web Development Bootcamp"],
      attendance: 85,
      avgGrade: "B+"
    },
    {
      id: 3,
      name: "Tao Chen",
      email: "tao.c@example.com",
      courses: ["Web Development Bootcamp"],
      attendance: 95,
      avgGrade: "A"
    },
    {
      id: 4,
      name: "Zara Ahmed",
      email: "zara.a@example.com",
      courses: ["Introduction to React", "Frontend Frameworks"],
      attendance: 75,
      avgGrade: "B"
    }
  ];
  
  const materials = [
    {
      id: 1,
      title: "React Components Lecture",
      course: "Introduction to React",
      type: "Presentation",
      uploadDate: "May 5, 2023",
      size: "4.2 MB"
    },
    {
      id: 2,
      title: "HTML/CSS Fundamentals",
      course: "Web Development Bootcamp",
      type: "Tutorial",
      uploadDate: "May 2, 2023",
      size: "3.5 MB"
    },
    {
      id: 3,
      title: "JavaScript Basics",
      course: "Frontend Frameworks",
      type: "Assignment",
      uploadDate: "May 7, 2023",
      size: "2.1 MB"
    }
  ];
  
  const pendingCertifications = [
    {
      id: 1,
      student: "Alex Johnson",
      course: "HTML & CSS Foundations",
      completionDate: "May 5, 2023",
      status: "Pending Review"
    },
    {
      id: 2,
      student: "Maya Rodriguez",
      course: "JavaScript Basics",
      completionDate: "May 3, 2023",
      status: "Pending Review"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg py-8 px-4 flex flex-col">
        <div className="mb-8 px-4">
          <img src={Logo} alt="EduLearn" className="h-10" />
        </div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "dashboard" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiHome className="mr-3" /> Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab("courses")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "courses" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiFolder className="mr-3" /> Courses
          </button>
          
          <button 
            onClick={() => setActiveTab("students")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "students" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiUsers className="mr-3" /> Students
          </button>
          
          <button 
            onClick={() => setActiveTab("materials")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "materials" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiFileText className="mr-3" /> Materials
          </button>
          
          <button 
            onClick={() => setActiveTab("schedule")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "schedule" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiCalendar className="mr-3" /> Schedule
          </button>
          
          <button 
            onClick={() => setActiveTab("assessments")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "assessments" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiPieChart className="mr-3" /> Assessments
          </button>
          
          <button 
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "certificates" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiAward className="mr-3" /> Certificates
          </button>
          
          <button 
            onClick={() => setActiveTab("messages")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "messages" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiMessageSquare className="mr-3" /> Messages
          </button>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-3 rounded-xl text-left text-gray-600 hover:bg-gray-100 transition-colors">
            <FiUser className="mr-3" /> Profile
          </button>
          <Link to="/login" className="flex items-center w-full px-4 py-3 rounded-xl text-left text-gray-600 hover:bg-gray-100 transition-colors">
            <FiLogOut className="mr-3" /> Logout
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {teacherName}!
          </h1>
          <div className="flex items-center">
            <button className="relative p-2 text-gray-500 hover:text-[#19a4db] transition-colors mr-4">
              <FiMessageSquare className="text-xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#19a4db] text-white flex items-center justify-center font-semibold mr-2">
                {teacherName.split(" ").map(name => name[0]).join("")}
              </div>
              <span className="text-gray-700 font-medium">{teacherName}</span>
            </div>
          </div>
        </div>
        
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Active Courses</h3>
                  <FiFolder className="text-[#19a4db] text-xl" />
                </div>
                <p className="text-3xl font-bold">{courses.length}</p>
                <p className="text-gray-500 mt-2">Current courses</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Total Students</h3>
                  <FiUsers className="text-[#6dc9f1] text-xl" />
                </div>
                <p className="text-3xl font-bold">{students.length}</p>
                <p className="text-gray-500 mt-2">Enrolled students</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Upcoming Classes</h3>
                  <FiCalendar className="text-[#19a4db] text-xl" />
                </div>
                <p className="text-3xl font-bold">{upcomingClasses.filter(cls => cls.date === "Today").length}</p>
                <p className="text-gray-500 mt-2">Classes today</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Pending Tasks</h3>
                  <FiAward className="text-[#6dc9f1] text-xl" />
                </div>
                <p className="text-3xl font-bold">{pendingCertifications.length}</p>
                <p className="text-gray-500 mt-2">Certifications to review</p>
              </div>
            </div>
            
            {/* Upcoming Classes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Today's Schedule</h2>
              <div className="space-y-4">
                {upcomingClasses.filter(cls => cls.date === "Today").map(cls => (
                  <div key={cls.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{cls.course}</h3>
                        <p className="text-gray-600 mt-1">{cls.location}</p>
                        <p className="text-gray-500 mt-1">{cls.students} students enrolled</p>
                      </div>
                      <div className="bg-blue-50 text-[#19a4db] px-4 py-2 rounded-lg font-medium">
                        {cls.time}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Start Class
                      </button>
                      <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                        View Students
                      </button>
                    </div>
                  </div>
                ))}
                
                {upcomingClasses.filter(cls => cls.date === "Today").length === 0 && (
                  <p className="text-gray-500 text-center py-4">No classes scheduled for today.</p>
                )}
              </div>
            </div>
            
            {/* Recent Students Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Student Overview</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Courses
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.slice(0, 3).map(student => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#19a4db] text-white flex items-center justify-center font-semibold mr-2">
                              {student.name.split(" ").map(name => name[0]).join("")}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.courses.join(", ")}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900 mr-2">{student.attendance}%</span>
                            <div className="w-16 bg-gray-100 rounded-full h-2">
                              <div 
                                className="bg-[#19a4db] h-2 rounded-full" 
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.avgGrade.includes("A") ? "bg-green-100 text-green-800" : 
                            student.avgGrade.includes("B") ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {student.avgGrade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-[#19a4db] hover:text-[#1582af] font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setActiveTab("students")}
                  className="text-[#19a4db] hover:text-[#1582af] font-medium"
                >
                  View All Students
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map(course => (
                <motion.div 
                  key={course.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <div className="mt-2 flex items-center">
                    <FiUsers className="text-gray-400 mr-2" />
                    <span className="text-gray-600">{course.students} Students</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <span className="text-gray-600">Next: {course.nextSession}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <FiHome className="text-gray-400 mr-2" />
                    <span className="text-gray-600">{course.location}</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Course Completion</span>
                      <span className="font-medium">{course.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div 
                        className="bg-[#19a4db] h-2.5 rounded-full" 
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Manage Course
                    </button>
                    <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                      View Students
                    </button>
                  </div>
                </motion.div>
              ))}
              
              {/* Add New Course Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <span className="text-3xl text-[#19a4db]">+</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Create New Course</h3>
                <p className="text-gray-500 mt-2">Add a new course to your teaching portfolio</p>
                <button className="mt-6 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>
        )}
        
        {activeTab === "students" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Manage Students</h2>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                />
                <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#19a4db]">
                  <option value="">All Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Courses
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map(student => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#19a4db] text-white flex items-center justify-center font-semibold mr-2">
                            {student.name.split(" ").map(name => name[0]).join("")}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.courses.join(", ")}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">{student.attendance}%</span>
                          <div className="w-16 bg-gray-100 rounded-full h-2">
                            <div 
                              className="bg-[#19a4db] h-2 rounded-full" 
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.avgGrade.includes("A") ? "bg-green-100 text-green-800" : 
                          student.avgGrade.includes("B") ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {student.avgGrade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#19a4db] hover:text-[#1582af] mr-4">
                          Send Message
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          Update Grades
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === "certificates" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Pending Certifications</h2>
            {pendingCertifications.length > 0 ? (
              <div className="space-y-4">
                {pendingCertifications.map(cert => (
                  <div key={cert.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{cert.student}</h3>
                        <p className="text-gray-600 mt-1">Course: {cert.course}</p>
                        <p className="text-gray-500 mt-1">Completed: {cert.completionDate}</p>
                      </div>
                      <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-medium">
                        {cert.status}
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Approve Certificate
                      </button>
                      <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                        View Student Progress
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No pending certification requests.</p>
            )}
            
            <h2 className="text-xl font-bold mt-8 mb-6">Certificate Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg">Course Completion</h3>
                <p className="text-gray-600 mt-1">Standard course completion certificate</p>
                <button className="mt-4 text-[#19a4db] hover:text-[#1582af] font-medium">
                  Edit Template
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg">Excellence Award</h3>
                <p className="text-gray-600 mt-1">For outstanding performance</p>
                <button className="mt-4 text-[#19a4db] hover:text-[#1582af] font-medium">
                  Edit Template
                </button>
              </div>
              <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl text-[#19a4db] mb-2">+</span>
                <h3 className="font-medium text-gray-700">Create New Template</h3>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "materials" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Course Materials</h2>
              <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                Upload New Material
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materials.map(material => (
                    <tr key={material.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{material.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{material.course}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          material.type === "Presentation" ? "bg-blue-100 text-blue-800" : 
                          material.type === "Assignment" ? "bg-purple-100 text-purple-800" : 
                          "bg-green-100 text-green-800"
                        }`}>
                          {material.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#19a4db] hover:text-[#1582af] mr-3">
                          Edit
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 mr-3">
                          Download
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard; 