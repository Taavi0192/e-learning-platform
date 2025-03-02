import React, { useState } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiUsers, FiCalendar, FiBook, FiEye, FiPieChart, FiMoreVertical } from 'react-icons/fi';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data for courses
  const courses = [
    {
      id: 'CRS-001',
      title: 'Introduction to React',
      category: 'Web Development',
      instructor: 'Dr. Amita Verma',
      duration: '8 weeks',
      enrolledStudents: 42,
      startDate: '2023-06-15',
      status: 'active',
      progress: 65,
      thumbnail: 'https://via.placeholder.com/150/19a4db/FFFFFF?text=React'
    },
    {
      id: 'CRS-002',
      title: 'Advanced JavaScript',
      category: 'Programming',
      instructor: 'Prof. Aryan Shah',
      duration: '10 weeks',
      enrolledStudents: 38,
      startDate: '2023-06-10',
      status: 'active',
      progress: 70,
      thumbnail: 'https://via.placeholder.com/150/f9ca24/000000?text=JS'
    },
    {
      id: 'CRS-003',
      title: 'UX/UI Design Fundamentals',
      category: 'Design',
      instructor: 'Dr. Nandini Gupta',
      duration: '6 weeks',
      enrolledStudents: 35,
      startDate: '2023-07-01',
      status: 'upcoming',
      progress: 0,
      thumbnail: 'https://via.placeholder.com/150/6c5ce7/FFFFFF?text=UX'
    },
    {
      id: 'CRS-004',
      title: 'Python for Data Science',
      category: 'Data Science',
      instructor: 'Dr. Sanjay Mehta',
      duration: '12 weeks',
      enrolledStudents: 50,
      startDate: '2023-05-01',
      status: 'active',
      progress: 80,
      thumbnail: 'https://via.placeholder.com/150/0984e3/FFFFFF?text=Python'
    },
    {
      id: 'CRS-005',
      title: 'Mobile App Development with Flutter',
      category: 'Mobile Development',
      instructor: 'Prof. Meera Kapoor',
      duration: '10 weeks',
      enrolledStudents: 30,
      startDate: '2023-07-15',
      status: 'upcoming',
      progress: 0,
      thumbnail: 'https://via.placeholder.com/150/00b894/FFFFFF?text=Flutter'
    },
    {
      id: 'CRS-006',
      title: 'Responsive Web Design',
      category: 'Web Development',
      instructor: 'Leela Devi',
      duration: '5 weeks',
      enrolledStudents: 25,
      startDate: '2023-04-01',
      status: 'completed',
      progress: 100,
      thumbnail: 'https://via.placeholder.com/150/fd79a8/FFFFFF?text=CSS'
    }
  ];

  // Filter courses based on active tab and search term
  const filteredCourses = courses
    .filter(course => {
      if (activeTab === 'all') return true;
      return course.status === activeTab;
    })
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Handler functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCourse = () => {
    alert('Add course functionality will be implemented here');
  };

  const handleEditCourse = (id) => {
    alert(`Edit course with ID: ${id}`);
  };

  const handleDeleteCourse = (id) => {
    alert(`Delete course with ID: ${id}`);
  };

  const handleViewCourse = (id) => {
    alert(`View course details for ID: ${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
        <button 
          onClick={handleAddCourse}
          className="flex items-center px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium hover:bg-[#1582af]"
        >
          <FiPlus className="mr-2" />
          Add New Course
        </button>
      </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Courses</p>
              <h3 className="text-3xl font-bold text-gray-800">{courses.length}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiBook className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Active Courses</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {courses.filter(c => c.status === 'active').length}
              </h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiPieChart className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Upcoming</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {courses.filter(c => c.status === 'upcoming').length}
              </h3>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FiCalendar className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Students</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {courses.reduce((sum, course) => sum + course.enrolledStudents, 0)}
              </h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiUsers className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Tab navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'all' ? 'bg-white shadow-sm text-[#19a4db]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Courses
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'active' ? 'bg-white shadow-sm text-[#19a4db]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'upcoming' ? 'bg-white shadow-sm text-[#19a4db]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'completed' ? 'bg-white shadow-sm text-[#19a4db]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover absolute mix-blend-overlay"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'active' ? 'bg-green-100 text-green-800' :
                  course.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {course.status === 'active' ? 'Active' : 
                   course.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{course.category}</p>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <span className="font-medium">Instructor:</span>
                <span className="ml-2">{course.instructor}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Enrolled</span>
                  <span className="font-semibold flex items-center">
                    <FiUsers className="mr-1 text-[#19a4db]" />
                    {course.enrolledStudents}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Duration</span>
                  <span className="font-semibold flex items-center">
                    <FiCalendar className="mr-1 text-[#19a4db]" />
                    {course.duration}
                  </span>
                </div>
              </div>
              
              {course.status !== 'upcoming' && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#19a4db] h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2 mt-3">
                <button 
                  onClick={() => handleViewCourse(course.id)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  <FiEye className="inline-block mr-1" />
                  View
                </button>
                <button 
                  onClick={() => handleEditCourse(course.id)}
                  className="flex-1 px-3 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium hover:bg-[#1582af]"
                >
                  <FiEdit className="inline-block mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default Courses; 