import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would validate credentials with your backend
    // This is just a placeholder for demonstration
    
    // Redirect based on selected role
    if (role === "student") {
      // Navigate to student dashboard
      window.location.href = "/student-dashboard";
    } else {
      // Navigate to teacher dashboard
      window.location.href = "/teacher-dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-lg">
          <div className="text-center mb-8">
            <img src={Logo} alt="EduLearn" className="h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500 mt-2">Choose your role to continue</p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole("student")}
              className={`w-full p-4 rounded-2xl flex items-center border-2 transition-all duration-200 ${
                role === "student" ? "border-[#19a4db] bg-blue-50" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <FiUser className={`text-xl ${role === "student" ? "text-[#6dc9f1]" : "text-gray-500"}`} />
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-gray-800">Login as Student</h3>
                <p className="text-sm text-gray-500">Access your courses and materials</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole("teacher")}
              className={`w-full p-4 rounded-2xl flex items-center border-2 transition-all duration-200 ${
                role === "teacher" ? "border-[#19a4db] bg-blue-50" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <FaChalkboardTeacher className={`text-xl ${role === "teacher" ? "text-[#19a4db]" : "text-gray-500"}`} />
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-gray-800">Login as Teacher</h3>
                <p className="text-sm text-gray-500">Manage your classes and content</p>
              </div>
            </motion.button>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-lg">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800">
                {role === "teacher" ? "Teacher Login" : "Student Login"}
              </h3>
              <p className="text-gray-500 mt-2">
                {role === "teacher" 
                  ? "Access your classroom and teaching materials" 
                  : "Access your courses, assignments and learning materials"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="School Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1c95ca]"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1c95ca]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-[#1c95ca]">Forgot Password?</Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className={`w-full py-4 px-6 text-white rounded-xl text-lg font-semibold ${
                  role === "teacher" ? "bg-[#19a4db]" : "bg-[#19a4db]"
                }`}
              >
                Log in
              </motion.button>

              <p className="text-center text-gray-600 mt-6">
                Don't have an account? <Link to="/signup" className="text-[#6dc9f1]">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
