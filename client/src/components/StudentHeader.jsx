import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import Logo from "../assets/logo.png";

const StudentHeader = ({ notifications = [], studentName = "Guest" }) => {
  return (
    <header className="bg-[#F8E8E8] shadow-sm py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center">
        <img src={Logo} alt="EduLearn" className="h-12 -my-1" />
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <button className="p-2 text-[#A01717] hover:text-[#800000] rounded-full hover:bg-[#F3D1D1]">
            <FiBell />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#A01717] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* User Profile Icon */}
        <div className="relative">
          <button className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#A01717] rounded-full flex items-center justify-center text-white font-medium">
              {studentName.trim() ? studentName.charAt(0).toUpperCase() : "G"}
            </div>
            <span className="text-sm text-[#A01717] hidden md:block">
              {studentName.trim() || "Guest"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
