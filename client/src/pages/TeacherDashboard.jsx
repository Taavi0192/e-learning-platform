import React from "react";
import { Outlet } from "react-router-dom";
import TeacherHeader from "../components/TeacherHeader";
import TeacherSidebar from "../components/TeacherSidebar";

const TeacherDashboard = () => {
    const notifications = [
        { id: 1, type: 'message', text: 'New message from student', time: '10m ago' },
        { id: 2, type: 'alert', text: 'Assignment submissions ready for review', time: '1h ago' },
    ];

    return (
        <div className="min-h-screen bg-[#F8E8E8] flex flex-col">
            {/* Styled Header */}
            <TeacherHeader
                notifications={notifications}
                teacherName="Dr. Jane Smith"
            />

            {/* Sidebar and Main Area */}
            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <TeacherSidebar />

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-[#F8E8E8] focus:outline-none">
                    <div className="py-6 px-4 sm:px-6 lg:px-8 text-[#A01717]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboard;
