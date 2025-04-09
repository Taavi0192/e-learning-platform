// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import StudentHeader from "../components/StudentHeader";
// import StudentSidebar from "../components/StudentSidebar";
// import Dashboard from "./student/Dashboard";
// import Courses from "./student/Courses";
// import NewCourses from "./student/NewCourses";
// import Progress from "./student/Progress";
// import Certificates from "./student/Certificates";
// import Attendance from "./student/Attendance";
// import Notifications from "./student/Notifications";
// import Support from "./student/Support";

// const StudentDashboard = () => {
//   const userName = localStorage.getItem("userName");

//   // Mock notifications to avoid undefined issues
//   const notifications = [
//     {
//       id: 1,
//       title: "Assignment Due",
//       message: "React Components assignment due tomorrow",
//       time: "2 hours ago",
//     },
//     {
//       id: 2,
//       title: "New Material Available",
//       message: "New lecture notes uploaded for JavaScript course",
//       time: "Yesterday",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <StudentHeader studentName={userName} notifications={notifications} />

//       <div className="pt-16 flex">
//         <StudentSidebar />

//         <main className="flex-1 p-6 overflow-x-hidden">
//           <Routes>
//             <Route path="/" element={<Dashboard studentName={userName} />} />
//             <Route path="courses" element={<Courses />} />
//             <Route path="new-courses" element={<NewCourses />} />
//             <Route path="progress" element={<Progress />} />
//             <Route path="certificates" element={<Certificates />} />
//             <Route path="attendance" element={<Attendance />} />
//             <Route path="notifications" element={<Notifications />} />
//             <Route path="support" element={<Support />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };  

// export default StudentDashboard;

import React from "react";
import { Outlet } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";

const StudentDashboard = () => {
  const userName = localStorage.getItem("userName");

  // Mock notifications
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
  ];

  return (
      <div className="min-h-screen bg-[#F8E8E8] flex flex-col">
        {/* Header */}
        <StudentHeader studentName={userName} notifications={notifications} />

        {/* Sidebar + Main content wrapper */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <StudentSidebar />

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

export default StudentDashboard;
