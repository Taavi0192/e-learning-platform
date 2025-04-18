import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
import logo from "../assets/logo.png";
import AuthContext from "../context/AuthContext"; // Import AuthContext

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await login(email, password, role); // pass role
      toast.success("Login successful!");

      setTimeout(() => {
        switch (role) {
          case "admin":
            window.location.href = "/dashboard";
            break;
          case "accountant":
            window.location.href = "/accountant-dashboard";
            break;
          case "owner":
            window.location.href = "/owner-dashboard";
            break;
          case "principal":
            window.location.href = "/principal-dashboard";
            break;
          default:
            break;
        }
      }, 1000);
    } catch (error) {
      toast.error("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen w-full flex bg-[#FFF8E7]">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#600000] to-[#D4AF37] p-12 flex-col justify-between relative overflow-hidden">
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
              Access your admin dashboard to manage courses, students, teachers,
              and monitor learning activities across the platform.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-24 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-12">
              <div className="lg:hidden mb-8">
                <img src={logo} alt="EduLearn" className="w-56 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold text-[#600000]">Portal Login</h3>
              <p className="text-gray-500 mt-3 text-lg">
                Access the e-learning platform controls
              </p>
            </div>

            <form className="space-y-6">
              {/* Email Field */}
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-hover:text-[#D4AF37] transition-colors duration-200" />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all duration-200 text-gray-900 text-lg hover:border-gray-200"
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-hover:text-[#D4AF37] transition-colors duration-200" />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all duration-200 text-gray-900 text-lg hover:border-gray-200"
                />
                <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible className="text-2xl" /> : <AiFillEye className="text-2xl" />}
                </button>
              </div>

              {/* Role Selection */}
              <div>
                <p className="text-gray-700 mb-2">Login as</p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {["admin", "accountant", "owner", "principal"].map((r) => (
                      <label key={r} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                            type="radio"
                            value={r}
                            checked={role === r}
                            onChange={() => setRole(r)}
                            className="h-4 w-4 text-[#600000] focus:ring-[#D4AF37] border-gray-300"
                        />
                        <span className="capitalize">{r}</span>
                      </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full py-4 px-6 ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#600000] hover:opacity-90"
                  } text-white rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 transition-all duration-200`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-8">
              Protected access to EduLearn administration portal. Subject to
              <a href="#" className="text-[#600000] hover:text-[#D4AF37] transition-colors duration-200">
                {" "}Privacy Policy
              </a>{" "}and
              <a href="#" className="text-[#600000] hover:text-[#D4AF37] transition-colors duration-200">
                {" "}Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Login;
