import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiBook,
  FiCalendar,
  FiClock,
  FiBell,
  FiAward,
  FiMessageSquare,
  FiLogOut,
  FiPlusCircle,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again!");
    }
  };

  return (
      <aside
          className="bg-[#F8E8E8] shadow-lg z-20 fixed inset-y-0 left-0 transition-all duration-300 transform lg:sticky lg:top-16 lg:translate-x-0 lg:h-[calc(100vh-4rem)] pt-16 lg:pt-0"
          style={{ width: "250px" }}
      >
        <div className="flex flex-col h-full py-4 px-3">
          <nav className="space-y-1 px-2">
            <SidebarLink to="/student-dashboard" icon={<FiCalendar />} text="Dashboard" active={isActive("/student-dashboard")} />
            <SidebarLink to="/student-dashboard/courses" icon={<FiBook />} text="My Courses" active={isActive("/student-dashboard/courses")} />
            <SidebarLink to="/student-dashboard/new-courses" icon={<FiPlusCircle />} text="New Courses" active={isActive("/student-dashboard/new-courses")} />
            <SidebarLink to="/student-dashboard/progress" icon={<FiClock />} text="Learning Progress" active={isActive("/student-dashboard/progress")} />
            <SidebarLink to="/student-dashboard/certificates" icon={<FiAward />} text="Certificates" active={isActive("/student-dashboard/certificates")} />
            <SidebarLink to="/student-dashboard/attendance" icon={<FiCalendar />} text="Attendance" active={isActive("/student-dashboard/attendance")} />
            <SidebarLink to="/student-dashboard/notifications" icon={<FiBell />} text="Notifications" active={isActive("/student-dashboard/notifications")} />
            <SidebarLink to="/student-dashboard/support" icon={<FiMessageSquare />} text="Support & Help" active={isActive("/student-dashboard/support")} />

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

const SidebarLink = ({ to, icon, text, active }) => {
  return (
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
};

export default StudentSidebar;
