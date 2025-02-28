import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiBook, FiCalendar, FiClock, FiBell, FiAward, FiMessageSquare, FiUser, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock data - would come from API in real app
  const studentName = "John Doe";
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "Sarah Johnson",
      schedule: "Mon, Wed 2:00 PM - 4:00 PM",
      progress: 65,
      nextLesson: "Component Lifecycle",
      nextDate: "Wed, May 15, 2023"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Michael Chen",
      schedule: "Tue, Thu 10:00 AM - 12:00 PM",
      progress: 40,
      nextLesson: "Promises and Async/Await",
      nextDate: "Tue, May 14, 2023"
    },
    {
      id: 3,
      title: "UX/UI Design Fundamentals",
      instructor: "Priya Sharma",
      schedule: "Fri 1:00 PM - 5:00 PM",
      progress: 85,
      nextLesson: "User Testing Methods",
      nextDate: "Fri, May 17, 2023"
    }
  ];
  
  const notifications = [
    {
      id: 1,
      title: "Assignment Due",
      message: "React Components assignment due tomorrow",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "New Material Available",
      message: "New lecture notes uploaded for JavaScript course",
      time: "Yesterday"
    },
    {
      id: 3,
      title: "Instructor Announcement",
      message: "No class on Friday due to holiday",
      time: "2 days ago"
    }
  ];
  
  const certificates = [
    {
      id: 1,
      course: "HTML & CSS Foundations",
      issueDate: "Jan 15, 2023",
      status: "Available"
    },
    {
      id: 2,
      course: "JavaScript Basics",
      issueDate: "Mar 22, 2023",
      status: "Available"
    }
  ];
  
  const attendanceStats = {
    overall: 92,
    recentClasses: [
      { date: "May 10", status: "Present" },
      { date: "May 8", status: "Present" },
      { date: "May 6", status: "Present" },
      { date: "May 4", status: "Absent" },
      { date: "May 2", status: "Present" }
    ]
  };

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
            <FiBook className="mr-3" /> Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab("courses")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "courses" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiCalendar className="mr-3" /> My Courses
          </button>
          
          <button 
            onClick={() => setActiveTab("attendance")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "attendance" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiClock className="mr-3" /> Attendance
          </button>
          
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "notifications" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiBell className="mr-3" /> Notifications
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
            onClick={() => setActiveTab("support")}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-left transition-colors ${
              activeTab === "support" ? "bg-[#19a4db] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiMessageSquare className="mr-3" /> Support
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
            Welcome back, {studentName}!
          </h1>
          <div className="flex items-center">
            <button className="relative p-2 text-gray-500 hover:text-[#19a4db] transition-colors mr-4">
              <FiBell className="text-xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#19a4db] text-white flex items-center justify-center font-semibold mr-2">
                {studentName.split(" ").map(name => name[0]).join("")}
              </div>
              <span className="text-gray-700 font-medium">{studentName}</span>
            </div>
          </div>
        </div>
        
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Courses Enrolled</h3>
                  <FiBook className="text-[#19a4db] text-xl" />
                </div>
                <p className="text-3xl font-bold">{courses.length}</p>
                <p className="text-gray-500 mt-2">Active courses</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Overall Progress</h3>
                  <FiClock className="text-[#6dc9f1] text-xl" />
                </div>
                <p className="text-3xl font-bold">
                  {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
                </p>
                <p className="text-gray-500 mt-2">Average completion</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Attendance Rate</h3>
                  <FiCalendar className="text-[#19a4db] text-xl" />
                </div>
                <p className="text-3xl font-bold">{attendanceStats.overall}%</p>
                <p className="text-gray-500 mt-2">Overall attendance</p>
              </div>
            </div>
            
            {/* Upcoming Courses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Upcoming Classes</h2>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <p className="text-gray-500">{course.instructor}</p>
                        <p className="text-gray-600 mt-1">Next: {course.nextLesson} • {course.nextDate}</p>
                      </div>
                      <div className="bg-blue-50 text-[#19a4db] px-4 py-2 rounded-lg font-medium">
                        {course.schedule}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-[#19a4db] h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="text-[#19a4db] hover:text-[#1582af] font-medium text-sm">
                        View Materials
                      </button>
                      <button className="text-[#19a4db] hover:text-[#1582af] font-medium text-sm">
                        Assignments
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Notifications</h2>
                <button className="text-sm text-[#19a4db]">View All</button>
              </div>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="min-w-8 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiBell className="text-[#19a4db]" />
                    </div>
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-gray-400 text-sm mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">My Courses</h2>
            {/* Course list with more details would go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map(course => (
                <motion.div 
                  key={course.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="text-gray-500">Instructor: {course.instructor}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div 
                        className="bg-[#19a4db] h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Continue Learning
                    </button>
                    <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === "certificates" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">My Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map(cert => (
                <div key={cert.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{cert.course}</h3>
                      <p className="text-gray-500">Issued: {cert.issueDate}</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 h-fit rounded-lg text-sm font-medium">
                      {cert.status}
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Download
                    </button>
                    <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                      View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === "attendance" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Attendance Record</h2>
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full border-8 border-[#19a4db] flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-[#19a4db]">{attendanceStats.overall}%</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Overall Attendance</h3>
                <p className="text-gray-500">You're doing great! Keep it up.</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Recent Classes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceStats.recentClasses.map((cls, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {cls.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            cls.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {cls.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">All Notifications</h2>
            <div className="space-y-6">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-start gap-4 border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="min-w-10 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiBell className="text-[#19a4db]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-gray-400 text-sm mt-2">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === "support" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Support & Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Contact Instructor</h3>
                <p className="text-gray-600 mb-4">Reach out to your course instructors directly.</p>
                <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Message Instructor
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Technical Support</h3>
                <p className="text-gray-600 mb-4">Having issues with the platform? Get technical help.</p>
                <button className="bg-[#19a4db] text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Contact Support
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="border border-gray-100 rounded-lg p-4">
                  <summary className="font-medium cursor-pointer">How do I submit assignments?</summary>
                  <p className="mt-2 text-gray-600">
                    Navigate to your course page, locate the assignment section, and click on "Submit Assignment". You can then upload your work as instructed.
                  </p>
                </details>
                <details className="border border-gray-100 rounded-lg p-4">
                  <summary className="font-medium cursor-pointer">How are courses graded?</summary>
                  <p className="mt-2 text-gray-600">
                    Courses are typically graded based on assignments, quizzes, participation, and final projects or exams. Specific grading criteria are provided by each instructor.
                  </p>
                </details>
                <details className="border border-gray-100 rounded-lg p-4">
                  <summary className="font-medium cursor-pointer">Can I download course materials?</summary>
                  <p className="mt-2 text-gray-600">
                    Yes, most course materials can be downloaded for offline study. Look for the download button next to lecture materials.
                  </p>
                </details>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard; 