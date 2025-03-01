import React, { useState } from 'react';
import { FiSearch, FiFilter, FiUserPlus, FiUserCheck, FiUserX, FiMail, FiDownload, FiEye, FiCalendar, FiAlertCircle } from 'react-icons/fi';

const Students = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data for pending student approvals
  const pendingStudents = [
    {
      id: 'STU-1001',
      name: 'Rahul Kumar',
      email: 'rahul.k@example.com',
      phone: '+91 98765 43210',
      course: 'Advanced JavaScript',
      appliedDate: '2023-05-18',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 'STU-1002',
      name: 'Priya Sharma',
      email: 'priya.s@example.com',
      phone: '+91 87654 32109',
      course: 'Introduction to React',
      appliedDate: '2023-05-17',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 'STU-1003',
      name: 'Vikram Singh',
      email: 'vikram.s@example.com',
      phone: '+91 76543 21098',
      course: 'UX/UI Design Fundamentals',
      appliedDate: '2023-05-16',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 'STU-1004',
      name: 'Ananya Patel',
      email: 'ananya.p@example.com',
      phone: '+91 65432 10987',
      course: 'Advanced JavaScript',
      appliedDate: '2023-05-15',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    {
      id: 'STU-1005',
      name: 'Raj Malhotra',
      email: 'raj.m@example.com',
      phone: '+91 54321 09876',
      course: 'Introduction to React',
      appliedDate: '2023-05-14',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/men/62.jpg'
    }
  ];

  // Mock data for approved students
  const approvedStudents = [
    {
      id: 'STU-895',
      name: 'Neha Verma',
      email: 'neha.v@example.com',
      phone: '+91 98765 12345',
      course: 'UX/UI Design Fundamentals',
      approvedDate: '2023-05-10',
      status: 'approved',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: 'STU-896',
      name: 'Arjun Reddy',
      email: 'arjun.r@example.com',
      phone: '+91 87654 23456',
      course: 'Advanced JavaScript',
      approvedDate: '2023-05-09',
      status: 'approved',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      id: 'STU-897',
      name: 'Kavita Gupta',
      email: 'kavita.g@example.com',
      phone: '+91 76543 34567',
      course: 'Introduction to React',
      approvedDate: '2023-05-08',
      status: 'approved',
      photo: 'https://randomuser.me/api/portraits/women/54.jpg'
    }
  ];

  // Mock data for rejected students
  const rejectedStudents = [
    {
      id: 'STU-763',
      name: 'Rakesh Sharma',
      email: 'rakesh.s@example.com',
      phone: '+91 98765 67890',
      course: 'Advanced JavaScript',
      rejectedDate: '2023-05-12',
      reason: 'Incomplete information provided',
      status: 'rejected',
      photo: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 'STU-764',
      name: 'Sunita Patel',
      email: 'sunita.p@example.com',
      phone: '+91 87654 78901',
      course: 'UX/UI Design Fundamentals',
      rejectedDate: '2023-05-11',
      reason: 'Duplicate application',
      status: 'rejected',
      photo: 'https://randomuser.me/api/portraits/women/38.jpg'
    }
  ];

  const getFilteredStudents = () => {
    let students = [];
    
    if (activeTab === 'pending') {
      students = pendingStudents;
    } else if (activeTab === 'approved') {
      students = approvedStudents;
    } else if (activeTab === 'rejected') {
      students = rejectedStudents;
    } else {
      students = [...pendingStudents, ...approvedStudents, ...rejectedStudents];
    }
    
    if (searchTerm) {
      return students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return students;
  };

  const handleApprove = (studentId) => {
    // In a real app, you would call an API to approve the student
    console.log(`Approving student ${studentId}`);
    alert(`Student ${studentId} approved successfully`);
  };

  const handleReject = (studentId) => {
    // In a real app, you would call an API to reject the student
    console.log(`Rejecting student ${studentId}`);
    alert(`Student ${studentId} rejected`);
  };

  const handleView = (studentId) => {
    // In a real app, you would navigate to the student details page
    console.log(`Viewing student ${studentId}`);
  };

  const handleContact = (studentEmail) => {
    // In a real app, you would open a contact form or mail client
    console.log(`Contacting student at ${studentEmail}`);
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const filteredStudents = getFilteredStudents();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg hover:bg-[#1582af] transition-colors text-sm font-medium flex items-center">
            <FiUserPlus className="mr-2" />
            Add Student
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
            <FiDownload className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                <FiUserPlus className="mr-2 text-[#19a4db]" />
                Student Registrations
              </h2>
              <p className="text-gray-500 text-sm">
                {activeTab === 'pending' ? `${pendingStudents.length} pending approvals` : 
                 activeTab === 'approved' ? `${approvedStudents.length} approved students` : 
                 activeTab === 'rejected' ? `${rejectedStudents.length} rejected applications` : 
                 'All student registrations'}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center space-x-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#19a4db]"
                />
              </div>
              
              <button 
                onClick={handleFilterToggle}
                className={`p-2 border ${filterOpen ? 'border-[#19a4db] text-[#19a4db] bg-blue-50' : 'border-gray-200 text-gray-600'} rounded-lg hover:bg-gray-50`}
              >
                <FiFilter />
              </button>
            </div>
          </div>
          
          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]">
                    <option value="">All Courses</option>
                    <option>Introduction to React</option>
                    <option>Advanced JavaScript</option>
                    <option>UX/UI Design Fundamentals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]">
                    <option value="">All Time</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'pending' 
                ? 'border-b-2 border-[#19a4db] text-[#19a4db] bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Approvals
            </button>
            <button 
              onClick={() => setActiveTab('approved')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'approved' 
                ? 'border-b-2 border-[#19a4db] text-[#19a4db] bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved
            </button>
            <button 
              onClick={() => setActiveTab('rejected')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'rejected' 
                ? 'border-b-2 border-[#19a4db] text-[#19a4db] bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rejected
            </button>
            <button 
              onClick={() => setActiveTab('all')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'all' 
                ? 'border-b-2 border-[#19a4db] text-[#19a4db] bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Students
            </button>
          </nav>
        </div>
        
        {activeTab === 'pending' && (
          <div className="divide-y divide-gray-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div key={student.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img 
                        src={student.photo} 
                        alt={student.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{student.name}</h3>
                        <div className="flex flex-wrap items-center text-xs text-gray-500 mt-1">
                          <span className="mr-3">{student.email}</span>
                          <span className="mr-3">{student.phone}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            {student.course}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
                      <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                        <FiCalendar className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">Applied: {student.appliedDate}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleView(student.id)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiEye className="inline-block mr-1" />
                          View
                        </button>
                        <button 
                          onClick={() => handleContact(student.email)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiMail className="inline-block mr-1" />
                          Contact
                        </button>
                        <button 
                          onClick={() => handleApprove(student.id)}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600"
                        >
                          <FiUserCheck className="inline-block mr-1" />
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(student.id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600"
                        >
                          <FiUserX className="inline-block mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <FiUserCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No Pending Approvals</h3>
                <p className="text-gray-500">All student registrations have been processed.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'approved' && (
          <div className="divide-y divide-gray-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div key={student.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img 
                        src={student.photo} 
                        alt={student.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{student.name}</h3>
                        <div className="flex flex-wrap items-center text-xs text-gray-500 mt-1">
                          <span className="mr-3">{student.email}</span>
                          <span className="mr-3">{student.phone}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            {student.course}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
                      <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FiUserCheck className="mr-1" />
                          Approved: {student.approvedDate}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleView(student.id)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiEye className="inline-block mr-1" />
                          View
                        </button>
                        <button 
                          onClick={() => handleContact(student.email)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiMail className="inline-block mr-1" />
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 mb-4">
                  <FiUserCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No Approved Students</h3>
                <p className="text-gray-500">No student applications have been approved yet.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'rejected' && (
          <div className="divide-y divide-gray-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div key={student.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img 
                        src={student.photo} 
                        alt={student.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{student.name}</h3>
                        <div className="flex flex-wrap items-center text-xs text-gray-500 mt-1">
                          <span className="mr-3">{student.email}</span>
                          <span className="mr-3">{student.phone}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            {student.course}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
                      <div className="flex flex-col mb-4 md:mb-0 md:mr-6">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FiUserX className="mr-1" />
                          Rejected: {student.rejectedDate}
                        </span>
                        <span className="text-sm text-gray-600 mt-1 flex items-center">
                          <FiAlertCircle className="text-red-500 mr-1" />
                          Reason: {student.reason}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleView(student.id)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiEye className="inline-block mr-1" />
                          View
                        </button>
                        <button 
                          onClick={() => handleContact(student.email)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiMail className="inline-block mr-1" />
                          Contact
                        </button>
                        <button 
                          onClick={() => handleApprove(student.id)}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600"
                        >
                          <FiUserCheck className="inline-block mr-1" />
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 mb-4">
                  <FiUserX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No Rejected Applications</h3>
                <p className="text-gray-500">No student applications have been rejected.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'all' && (
          <div className="divide-y divide-gray-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div key={student.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img 
                        src={student.photo} 
                        alt={student.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{student.name}</h3>
                        <div className="flex flex-wrap items-center text-xs text-gray-500 mt-1">
                          <span className="mr-3">{student.email}</span>
                          <span className="mr-3">{student.phone}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            {student.course}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
                      <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                        {student.status === 'pending' && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Pending Approval
                          </span>
                        )}
                        {student.status === 'approved' && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Approved
                          </span>
                        )}
                        {student.status === 'rejected' && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Rejected
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleView(student.id)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiEye className="inline-block mr-1" />
                          View
                        </button>
                        <button 
                          onClick={() => handleContact(student.email)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <FiMail className="inline-block mr-1" />
                          Contact
                        </button>
                        {student.status !== 'approved' && (
                          <button 
                            onClick={() => handleApprove(student.id)}
                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600"
                          >
                            <FiUserCheck className="inline-block mr-1" />
                            Approve
                          </button>
                        )}
                        {student.status === 'pending' && (
                          <button 
                            onClick={() => handleReject(student.id)}
                            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600"
                          >
                            <FiUserX className="inline-block mr-1" />
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 mb-4">
                  <FiUserPlus className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No Students Found</h3>
                <p className="text-gray-500">Try changing your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Pending Approvals</p>
              <h3 className="text-3xl font-bold text-gray-800">{pendingStudents.length}</h3>
              <p className="text-yellow-500 text-xs font-medium mt-2">Requires attention</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FiUserPlus className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Approved Students</p>
              <h3 className="text-3xl font-bold text-gray-800">{approvedStudents.length}</h3>
              <p className="text-green-500 text-xs font-medium mt-2">Active enrollments</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiUserCheck className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Rejection Rate</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {Math.round((rejectedStudents.length / (rejectedStudents.length + approvedStudents.length)) * 100)}%
              </h3>
              <p className="text-blue-500 text-xs font-medium mt-2">Based on processed applications</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiUserX className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students; 