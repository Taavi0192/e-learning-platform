import React from "react";
import { FiBell, FiSearch, FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/logo.png";

const Header = ({ toggleSidebar, isSidebarOpen, notifications }) => {
    return (
        <header className="bg-[#F8E8E8] shadow-sm py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="mr-2 text-[#A01717] hover:text-[#800000] focus:outline-none lg:hidden"
                >
                    {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <img src={Logo} alt="Probyn’s School System" className="h-14 -my-2" />
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A01717]" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-[#A01717] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A01717] focus:border-transparent bg-white text-[#A01717]"
                        />
                    </div>
                </div>

                <div className="relative">
                    <button className="p-2 text-[#A01717] hover:text-[#800000] rounded-full hover:bg-[#F3D1D1]">
                        <FiBell />
                        <span className="absolute top-0 right-0 bg-[#A01717] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
                    </button>
                </div>

                <div className="relative">
                    <button className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#A01717] rounded-full flex items-center justify-center text-white font-medium">
                            A
                        </div>
                        <span className="text-sm text-[#A01717] hidden md:block">Principal</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
