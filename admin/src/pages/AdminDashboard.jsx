import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FiHome, FiBook, FiCalendar, FiUsers, FiBell, FiPieChart, 
  FiAward, FiSettings, FiLogOut, FiMessageSquare, FiClipboard,
  FiShield, FiGrid, FiSearch, FiPlus, FiMenu, FiX 
} from "react-icons/fi";
import Logo from "../assets/logo.png";

// Import subpages (you'll create these later)
import Overview from "./dashboard/Overview";
import Courses from "./dashboard/Courses";
import Scheduling from "./dashboard/Scheduling";
import Students from "./dashboard/Students";
import Teachers from "./dashboard/Teachers";
import Communications from "./dashboard/Communications";
import Attendance from "./dashboard/Attendance";
import Certifications from "./dashboard/Certifications";
import UserManagement from "./dashboard/UserManagement";
import Reports from "./dashboard/Reports";
import Settings from "./dashboard/Settings";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock notification data
  const notifications = [
    { id: 1, type: 'registration', message: 'New student registration: Maya Rodriguez', time: '2 hours ago' },
    { id: 2, type: 'course', message: 'Course "React Fundamentals" is at 90% capacity', time: '3 hours ago' },
    { id: 3, type: 'system', message: 'System update scheduled for tonight at 2 AM', time: '5 hours ago' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === `/dashboard${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation bar */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-gray-500 hover:text-[#19a4db] focus:outline-none lg:hidden"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <img src={Logo} alt="EduLearn" className="h-10" />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#19a4db] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-[#19a4db] rounded-full hover:bg-gray-100">
              <FiBell />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
          </div>
          
          <div className="relative">
            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#19a4db] rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="text-sm text-gray-700 hidden md:block">Admin</span>
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg z-20 fixed inset-y-0 left-0 transition-all duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0 pt-16 lg:pt-0`}
          style={{ width: '250px' }}
        >
          <div className="flex flex-col h-full overflow-y-auto py-4 px-3">
            <nav className="space-y-1 px-2">
              <Link
                to="/dashboard"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiHome className="mr-3 h-5 w-5" />
                Dashboard Overview
              </Link>
              
              <Link
                to="/dashboard/courses"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/courses') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiBook className="mr-3 h-5 w-5" />
                Course Management
              </Link>
              
              <Link
                to="/dashboard/scheduling"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/scheduling') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiCalendar className="mr-3 h-5 w-5" />
                Scheduling & Planning
              </Link>
              
              <Link
                to="/dashboard/students"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/students') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiUsers className="mr-3 h-5 w-5" />
                Student Management
              </Link>
              
              <Link
                to="/dashboard/teachers"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/teachers') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiUsers className="mr-3 h-5 w-5" />
                Teacher Management
              </Link>
              
              <Link
                to="/dashboard/communications"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/communications') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiMessageSquare className="mr-3 h-5 w-5" />
                Communications
              </Link>
              
              <Link
                to="/dashboard/attendance"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/attendance') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiClipboard className="mr-3 h-5 w-5" />
                Attendance & Evaluations
              </Link>
              
              <Link
                to="/dashboard/certifications"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/certifications') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiAward className="mr-3 h-5 w-5" />
                Certifications
              </Link>
              
              <Link
                to="/dashboard/users"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/users') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiShield className="mr-3 h-5 w-5" />
                User Access Control
              </Link>
              
              <Link
                to="/dashboard/reports"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/reports') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiPieChart className="mr-3 h-5 w-5" />
                Reports & Analytics
              </Link>
              
              <Link
                to="/dashboard/settings"
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive('/settings') ? 'bg-[#19a4db] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiSettings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <FiLogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 relative z-0 overflow-auto bg-gray-50 focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/communications" element={<Communications />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 