import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

// Import shared components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// Import accountant subpages (to be created)
import FeeManagement from "./accountant/FeeManagement";
import Payments from "./accountant/FineSecurity";
import Salaries from "./accountant/StaffSalary";
import Expenses from "./accountant/MiscellaneousExpenses";
import AccountantOverview from "./accountant/Overview";

const AccountantDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    // Example accountant-specific notifications
    const notifications = [
        { id: 1, type: 'finance', message: 'New fee slip issued to student Ali Khan', time: '1 hour ago' },
        { id: 2, type: 'salary', message: 'Salary disbursement scheduled for faculty', time: '4 hours ago' },
        { id: 3, type: 'expense', message: 'Library expense recorded', time: '6 hours ago' },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-[#F8E8E8] flex flex-col">
            {/* Header Component */}
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                notifications={notifications}
            />

            {/* Content Area */}
            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <Sidebar isSidebarOpen={isSidebarOpen} navigate={navigate} userRole="accountant" />

                {/* Main Area */}
                <main className="flex-1 overflow-auto bg-[#F8E8E8] focus:outline-none">
                    <div className="py-6 px-4 sm:px-6 lg:px-8 text-[#A01717]">
                        <Routes>
                            <Route path="/" element={<AccountantOverview />} />
                            <Route path="/fees" element={<FeeManagement />} />
                            <Route path="/payments" element={<Payments />} />
                            <Route path="/salaries" element={<Salaries />} />
                            <Route path="/expenses" element={<Expenses />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountantDashboard;
