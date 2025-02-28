import React from "react";
import { Link } from "react-router-dom";
import { FiBook, FiCalendar, FiClock, FiBell, FiAward, FiMessageSquare, FiUser, FiLogOut } from "react-icons/fi";
import Logo from "../assets/logo.png";

const StudentSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white shadow-lg sticky top-16 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full py-6 px-4">
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "dashboard" ? "bg-[#19a4db] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiCalendar className="mr-3 h-5 w-5" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "courses" ? "bg-[#19a4db] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiBook className="mr-3 h-5 w-5" />
            My Courses
          </button>
          
          <button
            onClick={() => setActiveTab("progress")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "progress" ? "bg-[#19a4db] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiClock className="mr-3 h-5 w-5" />
            Learning Progress
          </button>
          
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "certificates" ? "bg-[#19a4db] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiAward className="mr-3 h-5 w-5" />
            Certificates
          </button>
          
          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "attendance" ? "bg-[#19a4db] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiCalendar className="mr-3 h-5 w-5" />
            Attendance
          </button>
          
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "notifications" ? "bg-[#19a4db] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiBell className="mr-3 h-5 w-5" />
            Notifications
          </button>
          
          <button
            onClick={() => setActiveTab("support")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "support" ? "bg-[#19a4db] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiMessageSquare className="mr-3 h-5 w-5" />
            Support & Help
          </button>
        </nav>
        
        <div className="pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={() => window.location.href = "/login"}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <FiLogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar; 