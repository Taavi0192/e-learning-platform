import React, { useState } from "react";
import TeacherHeader from "../components/TeacherHeader";
import TeacherSidebar from "../components/TeacherSidebar";
import Dashboard from "./teacher/Dashboard";
import Courses from "./teacher/Courses";
import Students from "./teacher/Students";
import Assignments from "./teacher/Assignments";
import Attendance from "./teacher/Attendance";
import Grades from "./teacher/Grades";
import Materials from "./teacher/Materials";
import Settings from "./teacher/Settings";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock data - would come from API in real app
  const teacherName = "Jane Smith";
  const courses = [
    {
      id: 1,
      name: "Introduction to React",
      code: "CSE-3320",
      department: "Computer Science",
      level: "Intermediate",
      schedule: "Mon, Wed 2:00 PM - 4:00 PM",
      studentsCount: 28,
      status: "Active"
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      code: "CSE-4210",
      department: "Computer Science",
      level: "Advanced",
      schedule: "Tue, Thu 10:00 AM - 12:00 PM",
      studentsCount: 18,
      status: "Active"
    },
    {
      id: 3,
      name: "UX/UI Design Fundamentals",
      code: "DES-2110",
      department: "Design",
      level: "Beginner",
      schedule: "Fri 1:00 PM - 5:00 PM",
      studentsCount: 35,
      status: "Upcoming"
    },
    {
      id: 4,
      name: "Web Development Basics",
      code: "CSE-1210",
      department: "Computer Science",
      level: "Beginner",
      schedule: "Mon, Wed 9:00 AM - 11:00 AM",
      studentsCount: 42,
      status: "Completed"
    }
  ];
  
  // Mock notifications
  const notifications = [
    { id: 1, type: "message", title: "New message from Michael Brown", time: "5 min ago" },
    { id: 2, type: "submission", title: "3 new assignment submissions", time: "1 hour ago" },
    { id: 3, type: "announcement", title: "New semester schedule released", time: "2 hours ago" }
  ];
  
  // Mock upcoming classes
  const upcomingClasses = [
    { 
      id: 1, 
      courseName: "Introduction to React", 
      date: "Today, 2:00 PM", 
      topic: "Component Lifecycle", 
      students: 28 
    },
    {
      id: 2,
      courseName: "Advanced JavaScript",
      date: "Tomorrow, 10:00 AM",
      topic: "Closures & Scope",
      students: 18
    },
    {
      id: 3,
      courseName: "Introduction to React",
      date: "Wed, 2:00 PM",
      topic: "Hooks & State Management",
      students: 28
    }
  ];
  
  // Mock pending assignments
  const pendingAssignments = [
    {
      id: 1,
      title: "React Components Assignment",
      courseName: "Introduction to React",
      dueDate: "May 20, 2023",
      submissions: 15,
      totalStudents: 28
    },
    {
      id: 2,
      title: "JavaScript Closures Quiz",
      courseName: "Advanced JavaScript",
      dueDate: "May 18, 2023",
      submissions: 10,
      totalStudents: 18
    },
    {
      id: 3,
      title: "User Interface Mockup",
      courseName: "UX/UI Design Fundamentals",
      dueDate: "May 25, 2023",
      submissions: 8,
      totalStudents: 35
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <TeacherHeader notifications={notifications} teacherName={teacherName} />
      
      <div className="pt-16 flex">
        <TeacherSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6 overflow-x-hidden">
          {activeTab === "dashboard" && (
            <Dashboard 
              teacherName={teacherName} 
              courses={courses} 
              upcomingClasses={upcomingClasses} 
              pendingAssignments={pendingAssignments} 
            />
          )}
          
          {activeTab === "courses" && <Courses courses={courses} />}
          
          {activeTab === "students" && <Students coursesList={courses} />}
          
          {activeTab === "assignments" && <Assignments />}
          
          {activeTab === "attendance" && <Attendance />}
          
          {activeTab === "grades" && <Grades />}
          
          {activeTab === "materials" && <Materials />}
          
          {activeTab === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard; 