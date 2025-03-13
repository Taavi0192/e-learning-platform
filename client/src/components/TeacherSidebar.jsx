import React from "react";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiClipboard,
  FiCalendar,
  FiCheckSquare,
  FiFileText,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";

const TeacherSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function
      toast.success("Logged out successfully!"); // Success toast
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again!"); // Error toast
    }
  };
  return (
    <aside className="w-64 bg-white shadow-lg sticky top-16 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full py-6 px-4">
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "dashboard"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiHome className="mr-3 h-5 w-5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "courses"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiBook className="mr-3 h-5 w-5" />
            My Courses
          </button>

          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "students"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiUsers className="mr-3 h-5 w-5" />
            Students
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "assignments"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiClipboard className="mr-3 h-5 w-5" />
            Assignments
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "attendance"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiCalendar className="mr-3 h-5 w-5" />
            Attendance
          </button>

          <button
            onClick={() => setActiveTab("grades")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "grades"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiCheckSquare className="mr-3 h-5 w-5" />
            Grades
          </button>

          <button
            onClick={() => setActiveTab("materials")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "materials"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiFileText className="mr-3 h-5 w-5" />
            Course Materials
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
              activeTab === "settings"
                ? "bg-[#19a4db] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiSettings className="mr-3 h-5 w-5" />
            Settings
          </button>
        </nav>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
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

export default TeacherSidebar;
