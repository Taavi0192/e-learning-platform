import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiClipboard,
  FiCheckSquare,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const TeacherSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
      <aside
          className="bg-[#F8E8E8] shadow-lg z-20 fixed inset-y-0 left-0 w-64 pt-16 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]"
      >
        <div className="flex flex-col h-full py-4 px-3">
          <nav className="space-y-1 px-2">
            <SidebarLink to="/teacher-dashboard" icon={<FiHome />} text="Dashboard" active={isActive("/teacher-dashboard")} />
            <SidebarLink to="/teacher-dashboard/courses" icon={<FiBook />} text="My Courses" active={isActive("/teacher-dashboard/courses")} />
            <SidebarLink to="/teacher-dashboard/students" icon={<FiUsers />} text="Students" active={isActive("/teacher-dashboard/students")} />
            <SidebarLink to="/teacher-dashboard/assignments" icon={<FiClipboard />} text="Assignments" active={isActive("/teacher-dashboard/assignments")} />
            <SidebarLink to="/teacher-dashboard/grades" icon={<FiCheckSquare />} text="Grades" active={isActive("/teacher-dashboard/grades")} />
            <SidebarLink to="/teacher-dashboard/settings" icon={<FiSettings />} text="Settings" active={isActive("/teacher-dashboard/settings")} />

            <div className="pt-4 mt-4 border-t border-[#A01717]">
              <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm text-[#A01717] hover:bg-[#F3D1D1] rounded-lg"
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </aside>
  );
};

const SidebarLink = ({ to, icon, text, active }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-3 text-sm rounded-lg ${
            active ? "bg-[#A01717] text-white" : "text-[#A01717] hover:bg-[#F3D1D1]"
        }`}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      {text}
    </Link>
);

export default TeacherSidebar;
