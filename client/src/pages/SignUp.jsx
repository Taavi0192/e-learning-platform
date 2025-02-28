import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "student", // Default role is student
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1); // Track form steps
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for this field when user types
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    // Only validate current step fields
    switch(step) {
      case 1:
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        break;
      case 2:
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords must match";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      // Clear any previous errors when moving to next step
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    // Clear any errors when going back
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // This would connect to the backend in a real app
    alert("Account created successfully! This is a demo version without backend connection.");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const steps = [
    {
      title: "Basic Information",
      description: "Let's start with your basic details",
      fields: (
        <>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#19a4db] transition-all duration-200 hover:bg-gray-100"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="School Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#19a4db] transition-all duration-200 hover:bg-gray-100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Role Selection */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sign up as</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="role-student"
                  name="role"
                  type="radio"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#19a4db] focus:ring-[#19a4db] border-gray-300"
                />
                <label htmlFor="role-student" className="ml-2 block text-sm text-gray-700">
                  Student
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="role-teacher"
                  name="role"
                  type="radio"
                  value="teacher"
                  checked={formData.role === "teacher"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#19a4db] focus:ring-[#19a4db] border-gray-300"
                />
                <label htmlFor="role-teacher" className="ml-2 block text-sm text-gray-700">
                  Teacher
                </label>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Security",
      description: "Create a secure password",
      fields: (
        <>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#19a4db] transition-all duration-200 hover:bg-gray-100"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#19a4db] transition-all duration-200 hover:bg-gray-100"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="h-screen w-full bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left Section - Progress */}
          <div className="bg-gradient-to-br from-[#19a4db] to-[#6dc9f1] p-6 lg:p-8 xl:p-10 text-white relative overflow-hidden h-full">
            {/* Decorative circles - made smaller */}
            <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full bg-white/10"></div>
            <div className="absolute -right-20 -bottom-20 w-56 h-56 rounded-full bg-white/10"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <img src={Logo} alt="EduLearn" className="h-20 mb-12" />
              <h2 className="text-4xl font-bold mb-4">Create Account</h2>
              <p className="text-base text-white/90 mb-12">Join our learning community and start your educational journey</p>
              
              {/* Progress Steps */}
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      currentStep > index ? "text-white" : "text-white/60"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 
                        ${
                          currentStep > index
                            ? "bg-white text-[#19a4db]"
                            : currentStep === index + 1
                            ? "bg-white/20"
                            : "bg-white/10"
                        }`}
                    >
                      {currentStep > index ? "✓" : index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-white/70">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Section */}
              <div className="mt-8">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "Course Access", desc: "1000+ courses" },
                    { title: "Community", desc: "Join study groups" },
                    { title: "Save Favorites", desc: "Bookmark lessons" },
                    { title: "Expert Tutors", desc: "Learn from the best" }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-3">
                      <h3 className="font-medium text-base">{feature.title}</h3>
                      <p className="text-xs text-white/70 mt-1">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-12 lg:p-16 xl:p-20 flex flex-col h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto w-full">
              <div className="mb-12">
                <h3 className="text-4xl font-bold text-gray-800">
                  {steps[currentStep - 1].title}
                </h3>
                <p className="text-gray-500 mt-3 text-xl">
                  {steps[currentStep - 1].description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
                {steps[currentStep - 1].fields}

                {/* Form Tips */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6">
                  <h4 className="text-blue-800 font-medium mb-2 text-lg">Tips:</h4>
                  {currentStep === 1 && (
                    <p className="text-blue-600">Choose a username that will be visible to your teachers and classmates</p>
                  )}
                  {currentStep === 2 && (
                    <p className="text-blue-600">Use a strong password with numbers and special characters</p>
                  )}
                </div>

                <div className="flex justify-between mt-12">
                  {currentStep > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="button"
                      onClick={handleBack}
                      className="px-10 py-4 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 font-medium text-lg"
                    >
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type={currentStep === steps.length ? "submit" : "button"}
                    onClick={currentStep === steps.length ? undefined : handleNext}
                    className="ml-auto px-10 py-4 bg-[#19a4db] text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium text-lg"
                  >
                    {currentStep === steps.length ? "Create Account" : "Next"}
                  </motion.button>
                </div>
              </form>

              <div className="mt-12 pt-6 border-t border-gray-100">
                <p className="text-center text-gray-600 text-lg">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#6dc9f1] hover:text-[#19a4db] transition-colors font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
