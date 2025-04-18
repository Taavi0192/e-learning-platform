import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

// Components
import Header from "../components/Header";
import OwnerSidebar from "../components/Sidebar";

// Pages (create these or reuse similar ones)
import Dashboard from "./owner/Dashboard";
// import Reports from "./owner/Reports";
// import Financials from "./owner/Financials";
// import Settings from "./owner/Settings";

const OwnerDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const notifications = [
        { id: 1, type: "summary", message: "Monthly report ready for download", time: "2 hours ago" },
        { id: 2, type: "alert", message: "New principal activity logged", time: "5 hours ago" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-[#F8E8E8] flex flex-col">
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                notifications={notifications}
            />

            <div className="flex flex-1 pt-16">
                <OwnerSidebar isSidebarOpen={isSidebarOpen} navigate={navigate} />

                <main className="flex-1 overflow-auto bg-[#F8E8E8] focus:outline-none">
                    <div className="py-6 px-4 sm:px-6 lg:px-8 text-[#A01717]">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            {/*<Route path="/reports" element={<Reports />} />*/}
                            {/*<Route path="/financials" element={<Financials />} />*/}
                            {/*<Route path="/settings" element={<Settings />} />*/}
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OwnerDashboard;
