import React, { useState, useEffect } from "react";
import { 
  FiFile, FiDownload, FiEdit, FiTrash2, FiCalendar, 
  FiPlus, FiX, FiUpload 
} from "react-icons/fi";

const Assignments = () => {
  // State for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "React Components Implementation",
      course: "Introduction to React",
      courseId: "REACT101",
      description: "Create a functional component and a class component with state management.",
      deadline: "2023-06-15",
      uploadDate: "2023-05-25",
      submissionCount: 18,
      totalStudents: 24,
      attachments: ["React_Components_Guidelines.pdf"]
    },
    {
      id: 2,
      title: "Advanced CSS Layout",
      course: "UX/UI Design Fundamentals",
      courseId: "UX101",
      description: "Implement a responsive layout using Flexbox and CSS Grid.",
      deadline: "2023-06-20",
      uploadDate: "2023-06-01",
      submissionCount: 15,
      totalStudents: 35,
      attachments: ["CSS_Layout_Requirements.pdf"]
    },
    {
      id: 3,
      title: "JavaScript Promises and Async/Await",
      course: "Advanced JavaScript",
      courseId: "JS202",
      description: "Create examples demonstrating Promises and Async/Await functionality.",
      deadline: "2023-06-10",
      uploadDate: "2023-05-28",
      submissionCount: 12,
      totalStudents: 18,
      attachments: ["Async_JavaScript_Guidelines.pdf", "Example_Code.js"]
    }
  ]);

  // State for courses (for dropdown selection)
  const [courses, setCourses] = useState([
    { id: 1, name: "Introduction to React", code: "REACT101" },
    { id: 2, name: "UX/UI Design Fundamentals", code: "UX101" },
    { id: 3, name: "Advanced JavaScript", code: "JS202" }
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [assignmentFile, setAssignmentFile] = useState(null);
  
  // State for new/edited assignment form
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    courseId: "",
    description: "",
    deadline: "",
    attachments: []
  });

  // Open modal for creating a new assignment
  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentAssignmentId(null);
    setAssignmentFile(null);
    setNewAssignment({
      title: "",
      course: "",
      courseId: "",
      description: "",
      deadline: "",
      attachments: []
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing assignment
  const openEditModal = (assignment) => {
    setIsEditing(true);
    setCurrentAssignmentId(assignment.id);
    setNewAssignment({
      title: assignment.title,
      course: assignment.course,
      courseId: assignment.courseId,
      description: assignment.description,
      deadline: assignment.deadline,
      attachments: assignment.attachments || []
    });
    setIsModalOpen(true);
  };

  // Handle input changes for assignment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({ ...prev, [name]: value }));
  };

  // Handle course selection change
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const selectedCourse = courses.find(course => course.code === courseId);
    
    if (selectedCourse) {
      setNewAssignment(prev => ({ 
        ...prev, 
        courseId: selectedCourse.code,
        course: selectedCourse.name
      }));
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignmentFile(file);
    }
  };

  // Submit the assignment form (create or update)
  const submitAssignment = () => {
    if (!newAssignment.title.trim()) {
      alert("Assignment title is required");
      return;
    }

    if (!newAssignment.courseId) {
      alert("Please select a course");
      return;
    }

    if (!newAssignment.deadline) {
      alert("Deadline is required");
      return;
    }

    // Create assignment object
    const assignmentData = {
      id: isEditing ? currentAssignmentId : Date.now(),
      title: newAssignment.title,
      course: newAssignment.course,
      courseId: newAssignment.courseId,
      description: newAssignment.description,
      deadline: newAssignment.deadline,
      uploadDate: new Date().toISOString().split('T')[0],
      submissionCount: isEditing ? assignments.find(a => a.id === currentAssignmentId)?.submissionCount || 0 : 0,
      totalStudents: 30, // This would come from the actual course data
      attachments: [...newAssignment.attachments]
    };

    // Add new file to attachments if one was selected
    if (assignmentFile) {
      assignmentData.attachments.push(assignmentFile.name);
    }

    if (isEditing) {
      // Update existing assignment
      setAssignments(assignments.map(assignment => 
        assignment.id === currentAssignmentId ? assignmentData : assignment
      ));
    } else {
      // Add new assignment
      setAssignments([...assignments, assignmentData]);
    }

    // Close modal and reset form
    setIsModalOpen(false);
    setAssignmentFile(null);
    setNewAssignment({
      title: "",
      course: "",
      courseId: "",
      description: "",
      deadline: "",
      attachments: []
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Delete assignment
  const deleteAssignment = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Assignments</h2>
          <button 
            onClick={openCreateModal}
            className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm flex items-center"
          >
            <FiPlus className="mr-2" />
            Create Assignment
          </button>
        </div>

        {/* All Assignments Table */}
        <div className="overflow-x-auto">
          {assignments.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attachments
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-1">{assignment.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignment.course}</div>
                      <div className="text-xs text-gray-500">{assignment.courseId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(assignment.deadline)}</div>
                      <div className="text-xs text-gray-500">{new Date(assignment.deadline) < new Date() ? 'Past due' : 'Upcoming'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {assignment.submissionCount} / {assignment.totalStudents}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-[#19a4db] h-2 rounded-full" 
                          style={{ width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        {assignment.attachments.map((file, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-500">
                            <FiFile className="mr-2 text-gray-400" />
                            <span className="truncate max-w-xs">{file}</span>
                            <button className="ml-2 text-[#19a4db] hover:text-[#1582af]">
                              <FiDownload size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openEditModal(assignment)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteAssignment(assignment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <FiFile className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new assignment.</p>
              <div className="mt-6">
                <button
                  onClick={openCreateModal}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#19a4db] hover:bg-[#1582af]"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  New Assignment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {isEditing ? "Edit Assignment" : "Create New Assignment"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assignment Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newAssignment.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                    placeholder="Enter assignment title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course*
                  </label>
                  <select
                    name="courseId"
                    value={newAssignment.courseId}
                    onChange={handleCourseChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.code}>
                        {course.name} ({course.code})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" size={16} />
                      Deadline*
                    </div>
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={newAssignment.deadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assignment Description
                  </label>
                  <textarea
                    name="description"
                    value={newAssignment.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                    placeholder="Describe the assignment"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload File
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="assignment-file"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#19a4db] hover:text-[#1582af] focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="assignment-file"
                            name="file"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, PPT up to 20MB
                      </p>
                      {assignmentFile && (
                        <p className="text-sm text-gray-700 font-medium mt-2">
                          {assignmentFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {newAssignment.attachments.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Attachments
                    </label>
                    <div className="space-y-2">
                      {newAssignment.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                          <div className="flex items-center">
                            <FiFile className="text-gray-500 mr-2" />
                            <span className="text-sm">{file}</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              setNewAssignment(prev => ({
                                ...prev,
                                attachments: prev.attachments.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitAssignment}
                className="px-4 py-2 bg-[#19a4db] text-white rounded-lg"
              >
                {isEditing ? "Update Assignment" : "Create Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments; 