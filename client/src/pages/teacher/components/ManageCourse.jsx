import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiAward, FiArrowLeft, FiSave, FiUpload, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import TeacherHeader from "../../../components/TeacherHeader";
import TeacherSidebar from "../../../components/TeacherSidebar";

const ManageCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [activeMenu, setActiveMenu] = useState("courses");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [courseImage, setCourseImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Mock data for notifications
  const notifications = [
    { id: 1, type: 'message', text: 'New message from student', time: '10m ago' },
    { id: 2, type: 'alert', text: 'Assignment submissions ready for review', time: '1h ago' },
  ];
  
  const [course, setCourse] = useState({
    name: "",
    code: "",
    maxStudents: "",
    price: "",
    duration: "",
    difficultyLevel: "beginner",
    category: "",
    instructorName: "",
    description: "",
    hasAssignments: false,
    hasQuizzes: false,
    certificateOffered: false,
    certificateTitle: "",
    certificateDescription: "",
    certificateTemplate: "",
  });

  // Load course data when component mounts
  useEffect(() => {
    // In a real app, you'd fetch the course data from your API
    // For now, let's simulate loading with mock data
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock data for the course being edited
      setCourse({
        id: courseId,
        name: "Introduction to React",
        code: "REACT101",
        maxStudents: "25",
        price: "3499",
        duration: "10",
        difficultyLevel: "intermediate",
        category: "Web Development",
        instructorName: "Dr. Jane Smith",
        description: "Learn the fundamentals of React including components, state, and hooks.",
        hasAssignments: true,
        hasQuizzes: true,
        certificateOffered: true,
        certificateTitle: "React Fundamentals Certificate",
        certificateDescription: "For completing the Introduction to React course",
      });
      
      // Mock image preview
      setImagePreview("https://via.placeholder.com/300x200?text=React+Course");
      
      setIsLoading(false);
    }, 1000);
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call to update course
    setTimeout(() => {
      setIsSaving(false);
      alert("Course updated successfully!");
      navigate('/teacher/courses');
    }, 1500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TeacherHeader 
        notifications={notifications} 
        teacherName="Dr. Jane Smith" 
      />
      
      <div className="flex flex-1 pt-16">
        <TeacherSidebar 
          activeTab={activeMenu}
          setActiveTab={setActiveMenu}
        />
        
        <div className="flex-1 p-6 ml-64">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#19a4db]"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Manage Course: {course.name}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveTab("basic")}
                      className={`px-4 py-2 text-sm rounded-lg ${
                        activeTab === "basic" ? "bg-[#19a4db] text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Basic Info
                    </button>
                    <button
                      onClick={() => setActiveTab("assignments")}
                      className={`px-4 py-2 text-sm rounded-lg ${
                        activeTab === "assignments" ? "bg-[#19a4db] text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Assignments
                    </button>
                    <button
                      onClick={() => setActiveTab("certificates")}
                      className={`px-4 py-2 text-sm rounded-lg ${
                        activeTab === "certificates" ? "bg-[#19a4db] text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Certificates
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Basic Info Tab */}
                {activeTab === "basic" && (
                  <div className="space-y-6">
                    {/* Basic Course Info - 2 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={course.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                          placeholder="e.g., Introduction to Python"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course Code*
                        </label>
                        <input
                          type="text"
                          name="code"
                          value={course.code}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                          placeholder="e.g., CS101"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Students*
                        </label>
                        <input
                          type="number"
                          name="maxStudents"
                          value={course.maxStudents}
                          onChange={handleInputChange}
                          required
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                          placeholder="e.g., 30"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price (₹)*
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={course.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                          placeholder="e.g., 1999"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (weeks)*
                        </label>
                        <input
                          type="number"
                          name="duration"
                          value={course.duration}
                          onChange={handleInputChange}
                          required
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                          placeholder="e.g., 8"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Difficulty Level*
                        </label>
                        <select
                          name="difficultyLevel"
                          value={course.difficultyLevel}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category*
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={course.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                          placeholder="e.g., Web Development"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instructor Name*
                        </label>
                        <input
                          type="text"
                          name="instructorName"
                          value={course.instructorName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    
                    {/* Course Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Thumbnail / Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          {imagePreview ? (
                            <div>
                              <img
                                src={imagePreview}
                                alt="Course thumbnail preview"
                                className="mx-auto h-32 w-auto object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setCourseImage(null);
                                  setImagePreview(null);
                                }}
                                className="mt-2 text-sm text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#19a4db] hover:text-[#1582af]"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Course Description - Full Width */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Description*
                      </label>
                      <textarea
                        name="description"
                        value={course.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                        placeholder="Provide a detailed description of your course"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Assignments & Quizzes Tab */}
                {activeTab === "assignments" && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-medium mb-4">Assessment Options</h3>
                      
                      {/* Assignment Settings */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Assignments</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Enable assignments for this course
                            </p>
                          </div>
                          <div className="relative">
                            <label className="flex items-center cursor-pointer">
                              <div className="relative">
                                <input 
                                  type="checkbox"
                                  className="sr-only"
                                  checked={course.hasAssignments}
                                  onChange={() => setCourse({
                                    ...course,
                                    hasAssignments: !course.hasAssignments
                                  })}
                                />
                                <div className={`block w-14 h-8 rounded-full ${course.hasAssignments ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${course.hasAssignments ? 'transform translate-x-6' : ''}`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quiz Settings */}
                      <div className="mb-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Quizzes</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Enable quizzes to test student knowledge
                            </p>
                          </div>
                          <div className="relative">
                            <label className="flex items-center cursor-pointer">
                              <div className="relative">
                                <input 
                                  type="checkbox"
                                  className="sr-only"
                                  checked={course.hasQuizzes}
                                  onChange={() => setCourse({
                                    ...course,
                                    hasQuizzes: !course.hasQuizzes
                                  })}
                                />
                                <div className={`block w-14 h-8 rounded-full ${course.hasQuizzes ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${course.hasQuizzes ? 'transform translate-x-6' : ''}`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Certificates Tab */}
                {activeTab === "certificates" && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-medium mb-4">Certificate Settings</h3>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Certificate Offered</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Issue certificates upon course completion
                            </p>
                          </div>
                          <div className="relative">
                            <label className="flex items-center cursor-pointer">
                              <div className="relative">
                                <input 
                                  type="checkbox"
                                  className="sr-only"
                                  checked={course.certificateOffered}
                                  onChange={() => setCourse({
                                    ...course,
                                    certificateOffered: !course.certificateOffered
                                  })}
                                />
                                <div className={`block w-14 h-8 rounded-full ${course.certificateOffered ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${course.certificateOffered ? 'transform translate-x-6' : ''}`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {course.certificateOffered && (
                        <div className="mt-6 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Certificate Title
                            </label>
                            <input
                              type="text"
                              name="certificateTitle"
                              value={course.certificateTitle}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                              placeholder="e.g., Certificate of Completion"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Certificate Description
                            </label>
                            <textarea
                              name="certificateDescription"
                              value={course.certificateDescription}
                              onChange={handleInputChange}
                              rows="3"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                              placeholder="Brief text describing the certificate"
                            ></textarea>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with Save and Cancel buttons */}
              <div className="flex justify-between items-center px-8 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => navigate('/teacher/courses')}
                  className="px-4 py-2 text-gray-700 flex items-center rounded-lg hover:bg-gray-100"
                >
                  <FiArrowLeft className="mr-2" />
                  Back to Courses
                </button>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate('/teacher/courses')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className={`px-6 py-2 bg-[#19a4db] text-white rounded-lg flex items-center ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1582af]'}`}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Save Course
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourse; 