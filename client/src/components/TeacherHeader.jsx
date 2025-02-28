import React from "react";
import { FiBell, FiMail, FiUser } from "react-icons/fi";
import Logo from "../assets/logo.png";

const TeacherHeader = ({ notifications = [], teacherName = "Teacher" }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center">
        <img src={Logo} alt="EduLearn" className="h-12 -my-1" />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 text-gray-500 hover:text-[#19a4db] rounded-full hover:bg-gray-100">
            <FiMail />
            {notifications.filter(n => n.type === 'message').length > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.filter(n => n.type === 'message').length}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <button className="p-2 text-gray-500 hover:text-[#19a4db] rounded-full hover:bg-gray-100">
            <FiBell />
            {notifications.filter(n => n.type !== 'message').length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.filter(n => n.type !== 'message').length}
              </span>
            )}
          </button>
        </div>
        
        <div className="relative">
          <button className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#19a4db] rounded-full flex items-center justify-center text-white font-medium">
              {teacherName.charAt(0)}
            </div>
            <span className="text-sm text-gray-700 hidden md:block">{teacherName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader; 