import React, { useState } from 'react';
import { FiSearch, FiFilter, FiUserPlus, FiUserCheck, FiUserX, FiMail, FiDownload, FiEye, FiCalendar, FiBook, FiBriefcase } from 'react-icons/fi';

const Teachers = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data for pending teacher approvals
  const pendingTeachers = [
    {
      id: 'TCH-1001',
      name: 'Dr. Sanjay Mehta',
      email: 'sanjay.m@example.com',
      phone: '+91 98765 43210',
      specialization: 'Web Development',
      experience: '8 years',
      appliedDate: '2023-05-18',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 'TCH-1002',
      name: 'Prof. Meera Kapoor',
      email: 'meera.k@example.com',
      phone: '+91 87654 32109',
      specialization: 'Frontend Development',
      experience: '5 years',
      appliedDate: '2023-05-17',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 'TCH-1003',
      name: 'Dr. Rajesh Gupta',
      email: 'rajesh.g@example.com',
      phone: '+91 76543 21098',
      specialization: 'UX/UI Design',
      experience: '10 years',
      appliedDate: '2023-05-16',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 'TCH-1004',
      name: 'Leela Devi',
      email: 'leela.d@example.com',
      phone: '+91 65432 10987',
      specialization: 'Backend Development',
      experience: '6 years',
      appliedDate: '2023-05-15',
      status: 'pending',
      photo: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ];

  // Mock data for approved teachers
  const approvedTeachers = [
    {
      id: 'TCH-895',
      name: 'Dr. Amita Verma',
      email: 'amita.v@example.com',
      phone: '+91 98765 12345',
      specialization: 'UX/UI Design',
      experience: '12 years',
      approvedDate: '2023-05-10',
      status: 'approved',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: 'TCH-896',
      name: 'Prof. Aryan Shah',
      email: 'aryan.s@example.com',
      phone: '+91 87654 23456',
      specialization: 'JavaScript & React',
      experience: '9 years',
      approvedDate: '2023-05-09',
      status: 'approved',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      id: 'TCH-897',
      name: 'Dr. Nandini Gupta',
      email: 'nandini.g@example.com',
      phone: '+91 76543 34567',
      specialization: 'Full Stack Development',
      experience: '15 years',
      approvedDate: '2023-05-08',
      status: 'approved',
      photo: 'https://randomuser.me/api/portraits/women/54.jpg'
    }
  ];

  // Mock data for rejected teachers
  const rejectedTeachers = [
    {
      id: 'TCH-763',
      name: 'Ramesh Kumar',
      email: 'ramesh.k@example.com',
      phone: '+91 98765 67890',
      specialization: 'Frontend Development',
      experience: '3 years',
      rejectedDate: '2023-05-12',
      reason: 'Insufficient experience',
      status: 'rejected',
      photo: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 'TCH-764',
      name: 'Priti Singh',
      email: 'priti.s@example.com',
      phone: '+91 87654 78901',
      specialization: 'UX Design',
      experience: '4 years',
      rejectedDate: '2023-05-11',
      reason: 'Incomplete credentials',
      status: 'rejected',
      photo: 'https://randomuser.me/api/portraits/women/29.jpg'
    }
  ];

  // Get teachers based on active tab
  const getFilteredTeachers = () => {
    let teachers = [];
    switch (activeTab) {
      case 'pending':
        teachers = pendingTeachers;
        break;
      case 'approved':
        teachers = approvedTeachers;
        break;
      case 'rejected':
        teachers = rejectedTeachers;
        break;
      case 'all':
        teachers = [...pendingTeachers, ...approvedTeachers, ...rejectedTeachers];
        break;
      default:
        teachers = pendingTeachers;
    }

    // Apply search filter
    if (searchTerm.trim() !== '') {
      return teachers.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return teachers;
  };

  // Action handlers
  const handleApprove = (id) => {
    console.log(`Approving teacher with ID: ${id}`);
    // Here you would make API call to approve teacher
  };

  const handleReject = (id) => {
    console.log(`Rejecting teacher with ID: ${id}`);
    // Here you would make API call to reject teacher
  };

  const handleView = (id) => {
    console.log(`Viewing teacher with ID: ${id}`);
    // Here you would navigate to teacher detail page
  };

  const handleContact = (email) => {
    console.log(`Contacting teacher with email: ${email}`);
    // Here you would open email client or message interface
  };

  const handleExport = () => {
    console.log('Exporting teacher data');
    // Here you would generate and download CSV/Excel file
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Teacher Management</h1>
      
      {/* Action bar with tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 pb-4">
          <div className="flex space-x-4 mb-4 sm:mb-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Pending Approval
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'rejected' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Rejected
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'all' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Teachers
            </button>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#19a4db] focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className={`p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 ${filterOpen ? 'bg-gray-50' : ''}`}
            >
              <FiFilter />
            </button>
            
            <button 
              onClick={handleExport}
              className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <FiDownload />
            </button>
          </div>
        </div>
        
        {filterOpen && (
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]">
                  <option value="">All Specializations</option>
                  <option value="web">Web Development</option>
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="fullstack">Full Stack Development</option>
                  <option value="ui">UX/UI Design</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]">
                  <option value="">Any Experience</option>
                  <option value="0-3">0-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]">
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm mr-2 hover:bg-gray-200">
                Reset
              </button>
              <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm hover:bg-[#1483b0]">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Teacher cards */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {activeTab === 'pending' && 'Teachers Awaiting Approval'}
          {activeTab === 'approved' && 'Approved Teachers'}
          {activeTab === 'rejected' && 'Rejected Teachers'}
          {activeTab === 'all' && 'All Teachers'}
          <span className="text-gray-500 text-sm font-normal ml-2">
            ({getFilteredTeachers().length})
          </span>
        </h2>
        
        {getFilteredTeachers().length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 mb-4">
              <FiUserPlus className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No Teachers Found</h3>
            <p className="text-gray-500">Try changing your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {getFilteredTeachers().map(teacher => (
              <div key={teacher.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col md:flex-row items-start mb-4 md:mb-0 md:mr-6">
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 mr-4 mb-4 md:mb-0"
                    />
                    
                    <div>
                      <h3 className="font-semibold text-lg">{teacher.name}</h3>
                      <p className="text-gray-600">{teacher.email}</p>
                      <p className="text-gray-500 text-sm mt-1">{teacher.phone}</p>
                      
                      <div className="flex flex-wrap mt-2 gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FiBook className="mr-1" size={12} />
                          {teacher.specialization}
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FiBriefcase className="mr-1" size={12} />
                          {teacher.experience}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FiCalendar className="mr-1" size={12} />
                          {teacher.appliedDate || teacher.approvedDate || teacher.rejectedDate}
                        </span>
                      </div>
                      
                      {teacher.reason && (
                        <div className="mt-2 text-sm text-red-600">
                          <span className="font-medium">Reason for rejection:</span> {teacher.reason}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:ml-auto">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                      {teacher.status === 'pending' && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Pending Approval
                        </span>
                      )}
                      {teacher.status === 'approved' && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Approved
                        </span>
                      )}
                      {teacher.status === 'rejected' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Rejected
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleView(teacher.id)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        <FiEye className="inline-block mr-1" />
                        View
                      </button>
                      <button 
                        onClick={() => handleContact(teacher.email)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        <FiMail className="inline-block mr-1" />
                        Contact
                      </button>
                      {teacher.status !== 'approved' && (
                        <button 
                          onClick={() => handleApprove(teacher.id)}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600"
                        >
                          <FiUserCheck className="inline-block mr-1" />
                          Approve
                        </button>
                      )}
                      {teacher.status === 'pending' && (
                        <button 
                          onClick={() => handleReject(teacher.id)}
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
            ))}
          </div>
        )}
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Pending Approvals</p>
              <h3 className="text-3xl font-bold text-gray-800">{pendingTeachers.length}</h3>
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
              <p className="text-gray-500 text-sm font-medium mb-1">Approved Teachers</p>
              <h3 className="text-3xl font-bold text-gray-800">{approvedTeachers.length}</h3>
              <p className="text-green-500 text-xs font-medium mt-2">Active faculty</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiUserCheck className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Avg. Experience</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {Math.round(
                  approvedTeachers.reduce((sum, teacher) => sum + parseInt(teacher.experience), 0) / 
                  (approvedTeachers.length || 1)
                )}y
              </h3>
              <p className="text-blue-500 text-xs font-medium mt-2">Years of teaching</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiBriefcase className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers; 