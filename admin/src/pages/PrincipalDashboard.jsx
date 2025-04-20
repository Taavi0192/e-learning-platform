import React, { useState } from "react";
import Header from "../components/PrincipalHeader";
import Sidebar from "../components/PrincipalSidebar";
import Dashboard from "./Principal/Dashboard";
import { useNavigate } from "react-router-dom";

const PrincipalDashboardShell = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const notifications = [
        { id: 1, type: 'attendance', message: 'Student Ali Khan absent today', time: '1 hour ago' },
        { id: 2, type: 'alert', message: 'New fine issued in Grade 05', time: '3 hours ago' },
        { id: 3, type: 'system', message: 'Monthly attendance report available', time: '5 hours ago' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-[#F8E8E8] flex flex-col">
            {/* Header */}
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                notifications={notifications}
            />

            {/* Layout */}
            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <Sidebar isSidebarOpen={isSidebarOpen} navigate={navigate} />

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-[#F8E8E8] focus:outline-none px-4 sm:px-6 lg:px-8 py-6 text-[#A01717]">
                    <Dashboard />
                </main>
            </div>
        </div>
    );
};

export default PrincipalDashboardShell;
