import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
import logo from "../assets/logo.png";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // In a real app, you would validate credentials with a backend API call
    if (email && password) {
      // Navigate to admin dashboard after successful login
      window.location.href = "/dashboard";
    } else {
      toast.error("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#19a4db] to-[#6dc9f1] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent z-0"></div>
        <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-white/10"></div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10"></div>
        <div className="relative z-10">
          <img 
            src={logo} 
            alt="EduLearn Logo" 
            className="w-72 mb-12 transform hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-5xl font-bold mb-6 text-white">Admin Portal</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Access your admin dashboard to manage courses, students, teachers, and monitor learning activities across the platform.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold text-lg mb-2">Course Management</h3>
              <p className="text-white/80">Create, update and manage all educational content</p>
            </div>
            <div className="bg-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold text-lg mb-2">User Administration</h3>
              <p className="text-white/80">Manage student and teacher accounts</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-24 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-12">
            <div className="lg:hidden mb-8">
              <img src={logo} alt="EduLearn" className="w-56 mx-auto" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Admin Login</h3>
            <p className="text-gray-500 mt-3 text-lg">Access the e-learning platform controls</p>
          </div>
          <form className="space-y-6">
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-hover:text-[#19a4db] transition-colors duration-200" />
              <input
                type="email"
                placeholder="Admin Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#19a4db] transition-all duration-200 text-gray-900 text-lg hover:border-gray-200"
              />
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-hover:text-[#19a4db] transition-colors duration-200" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#19a4db] transition-all duration-200 text-gray-900 text-lg hover:border-gray-200"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-2xl" />
                ) : (
                  <AiFillEye className="text-2xl" />
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-4 px-6 bg-[#19a4db] text-white rounded-xl text-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#19a4db] focus:ring-offset-2 transition-all duration-200"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-8">
            Protected access to EduLearn administration portal. Subject to 
            <a href="#" className="text-[#19a4db] hover:text-[#6dc9f1] transition-colors duration-200"> Privacy Policy</a> and 
            <a href="#" className="text-[#19a4db] hover:text-[#6dc9f1] transition-colors duration-200"> Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
