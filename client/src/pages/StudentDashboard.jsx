import React, { useState } from "react";
import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";
import Dashboard from "./student/Dashboard";
import Courses from "./student/Courses";
import Progress from "./student/Progress";
import Certificates from "./student/Certificates";
import Attendance from "./student/Attendance";
import Notifications from "./student/Notifications";
import Support from "./student/Support";
import { FiAward } from "react-icons/fi";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const userName = localStorage.getItem("userName");

  // Mock data - would come from API in real app
  const studentName = userName;

  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "Sarah Johnson",
      schedule: "Mon, Wed 2:00 PM - 4:00 PM",
      progress: 65,
      nextLesson: "Component Lifecycle",
      nextDate: "Wed, May 15, 2023",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Michael Chen",
      schedule: "Tue, Thu 10:00 AM - 12:00 PM",
      progress: 40,
      nextLesson: "Promises and Async/Await",
      nextDate: "Tue, May 14, 2023",
    },
    {
      id: 3,
      title: "UX/UI Design Fundamentals",
      instructor: "Priya Sharma",
      schedule: "Fri 1:00 PM - 5:00 PM",
      progress: 85,
      nextLesson: "User Testing Methods",
      nextDate: "Fri, May 17, 2023",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Assignment Due",
      message: "React Components assignment due tomorrow",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "New Material Available",
      message: "New lecture notes uploaded for JavaScript course",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Instructor Announcement",
      message: "No class on Friday due to holiday",
      time: "2 days ago",
    },
  ];

  const certificates = [
    {
      id: 1,
      course: "HTML & CSS Foundations",
      issueDate: "Jan 15, 2023",
      status: "Available",
    },
    {
      id: 2,
      course: "JavaScript Basics",
      issueDate: "Mar 22, 2023",
      status: "Available",
    },
  ];

  const attendanceStats = {
    overall: 92,
    recentClasses: [
      { date: "May 10", status: "Present" },
      { date: "May 8", status: "Present" },
      { date: "May 6", status: "Absent" },
      { date: "May 3", status: "Present" },
      { date: "May 1", status: "Present" },
      { date: "Apr 28", status: "Present" },
      { date: "Apr 26", status: "Excused" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentHeader notifications={notifications} studentName={studentName} />

      <div className="pt-16 flex">
        <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 overflow-x-hidden">
          {activeTab === "dashboard" && (
            <Dashboard studentName={studentName} courses={courses} />
          )}
          {activeTab === "courses" && <Courses courses={courses} />}
          {activeTab === "progress" && <Progress courses={courses} />}
          {activeTab === "certificates" && (
            <Certificates certificates={certificates} />
          )}
          {activeTab === "attendance" && (
            <Attendance attendanceStats={attendanceStats} />
          )}
          {activeTab === "notifications" && (
            <Notifications notifications={notifications} />
          )}
          {activeTab === "support" && <Support />}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
