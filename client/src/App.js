import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Remove `Router` import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseManagement from "./pages/teacher/components/ManageCourse";
import Dashboard from "./pages/teacher/Dashboard";
import Courses from "./pages/teacher/Courses";
import Students from "./pages/teacher/Students";
import Assignments from "./pages/teacher/Assignments";
import Attendance from "./pages/teacher/Attendance";
import Grades from "./pages/teacher/Grades";
import Materials from "./pages/teacher/Materials";
import Settings from "./pages/teacher/Settings";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard teacherName="Dr. Jane Smith" courses={mockCourses} upcomingClasses={mockClasses} pendingAssignments={mockAssignments} />} />
          <Route path="courses" element={<Courses courses={mockCourses} />} />
          <Route path="courses/:courseId/manage" element={<CourseManagement />} />
          <Route path="students" element={<Students coursesList={mockCourses} />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="grades" element={<Grades />} />
          <Route path="materials" element={<Materials />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

// Mock data for the teacher dashboard
const mockCourses = [
  {
    id: "1",
    name: "Introduction to React",
    code: "REACT101",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    status: "Active", 
    studentsCount: 28
  },
  {
    id: "2",
    name: "Advanced JavaScript",
    code: "JS202",
    schedule: "Tue, Thu - 02:00 PM",
    status: "Active",
    studentsCount: 18
  },
  {
    id: "3",
    name: "UX/UI Design Fundamentals",
    code: "UX101",
    schedule: "Mon, Wed - 03:00 PM",
    status: "Upcoming",
    studentsCount: 35
  }
];

const mockClasses = [
  {
    id: 1,
    courseName: "Introduction to React",
    topic: "React Hooks",
    date: new Date().toISOString(),
    time: "10:00 AM",
    studentsCount: 28
  },
  {
    id: 2,
    courseName: "Advanced JavaScript",
    topic: "Closures & Scope",
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    time: "02:00 PM",
    studentsCount: 18
  },
  {
    id: 3,
    courseName: "UX/UI Design Fundamentals",
    topic: "User Research Methods",
    date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    time: "03:00 PM",
    studentsCount: 35
  }
];

const mockAssignments = [
  {
    id: 1,
    title: "React Components Assignment",
    courseName: "Introduction to React",
    dueDate: "May 20, 2023",
    totalStudents: 28,
    submissionCount: 15
  },
  {
    id: 2,
    title: "JavaScript Closures Quiz",
    courseName: "Advanced JavaScript",
    dueDate: "May 18, 2023",
    totalStudents: 18,
    submissionCount: 10
  },
  {
    id: 3,
    title: "User Interface Mockup",
    courseName: "UX/UI Design Fundamentals",
    dueDate: "May 25, 2023",
    totalStudents: 35,
    submissionCount: 8
  }
];

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Login from "./pages/Login";
// import Signup from "./pages/SignUp";
// import ForgotPassword from "./pages/ForgotPassword";

// import ProtectedRoute from "./components/ProtectedRoute";

// // **Teacher Components**
// import TeacherDashboard from "./pages/teacher/Dashboard";
// import CourseManagement from "./pages/teacher/components/ManageCourse";
// import TeacherSidebar from "./components/TeacherSidebar"; // Sidebar for teacher layout
// // import TeacherCourses from "./pages/teacher/TeacherCourses";
// // import TeacherStudents from "./pages/teacher/TeacherStudents";

// // **Student Components**
// import StudentDashboard from "./pages/student/Dashboard";
// // import StudentCourses from "./pages/student/StudentCourses";
// // import StudentAssignments from "./pages/student/StudentAssignments";
// import StudentSidebar from "./components/StudentSidebar"; // Sidebar for student layout

// // **Layout Component for Teacher Dashboard**
// const TeacherLayout = () => (
//   <div className="flex">
//     <TeacherSidebar />
//     <div className="flex-1 p-4">
//       <Routes>
//         {/* <Route index element={<Navigate to="courses" replace />} /> */}
//         <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
//         {/* <Route path="courses" element={<TeacherCourses />} /> */}
//         {/* <Route path="students" element={<TeacherStudents />} /> */}
//         <Route path="courses/manage" element={<CourseManagement />} />
//       </Routes>
//     </div>
//   </div>
// );

// // **Layout Component for Student Dashboard**
// const StudentLayout = () => (
//   <div className="flex">
//     <StudentSidebar />
//     <div className="flex-1 p-4">
//       <Routes>
//         {/* <Route index element={<Navigate to="/" replace />} /> */}
//         {/* <Route index element={<Navigate to="courses" replace />} /> */}
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         {/* <Route path="assignments" element={<StudentAssignments />} /> */}
//       </Routes>
//     </div>
//   </div>
// );

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Protected Nested Routes */}
//         <Route
//           path="/teacher-dashboard/*"
//           element={
//             <ProtectedRoute>
//               <TeacherLayout />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/student-dashboard/*"
//           element={
//             <ProtectedRoute>
//               <StudentLayout />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       <ToastContainer />
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Login from "./pages/Login";
// import Signup from "./pages/SignUp";
// import ForgotPassword from "./pages/ForgotPassword";

// import ProtectedRoute from "./components/ProtectedRoute";

// // **Teacher Components**
// import TeacherDashboard from "./pages/TeacherDashboard";
// import CourseManagement from "./pages/teacher/components/ManageCourse";
// import TeacherSidebar from "./components/TeacherSidebar";

// // **Student Components**
// import StudentDashboard from "./pages/student/Dashboard";
// import StudentSidebar from "./components/StudentSidebar";
// import Courses from "./pages/teacher/Courses";

// // **Layout Component for Teacher Dashboard**
// const TeacherLayout = () => (
//   <div className="flex">
//     <TeacherSidebar />
//     <div className="flex-1 p-4">
//       <Routes>
//         <Route index element={<Navigate to="dashboard" replace />} />
//         <Route path="dashboard" element={<TeacherDashboard />} />
//         <Route path="courses/manage" element={<CourseManagement />} />
//         <Route path="courses" element={<Courses />} />
//       </Routes>
//     </div>
//   </div>
// );

// // **Layout Component for Student Dashboard**
// const StudentLayout = () => (
//   <div className="flex">
//     <StudentSidebar />
//     <div className="flex-1 p-4">
//       <Routes>
//         <Route index element={<Navigate to="dashboard" replace />} />
//         <Route path="dashboard" element={<StudentDashboard />} />
//       </Routes>
//     </div>
//   </div>
// );

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Protected Nested Routes */}
//         <Route
//           path="/teacher-dashboard/*"
//           element={
//             <ProtectedRoute>
//               <TeacherLayout />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/student-dashboard/*"
//           element={
//             <ProtectedRoute>
//               <StudentLayout />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       <ToastContainer />
//     </>
//   );
// }

// export default App;
