import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiCalendar, FiUsers, FiBook, FiCheckCircle, FiXCircle, FiAlertCircle, FiClock, FiPieChart } from 'react-icons/fi';

const Attendance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for courses
  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'CRS-001', name: 'Mathematics' },
    { id: 'CRS-002', name: 'Science' },
    { id: 'CRS-003', name: 'English' },
    { id: 'CRS-004', name: 'History' }
  ];
  
  // Mock data for attendance records
  const attendanceRecords = [
    {
      id: 'ATT-001',
      studentId: 'STU-1001',
      studentName: 'Ali Khan',
      course: 'Mathematics',
      courseId: 'CRS-001',
      date: '2023-06-12',
      status: 'present',
      arrivalTime: '08:55 AM'
    },
    {
      id: 'ATT-002',
      studentId: 'STU-1002',
      studentName: 'Sara Ahmed',
      course: 'Mathematics',
      courseId: 'CRS-001',
      date: '2023-06-12',
      status: 'absent',
      arrivalTime: null
    }
  ];
  
  // Calculate attendance statistics
  const calculateStats = (records) => {
    const filteredRecords = records.filter(record => 
      (selectedCourse === 'all' || record.courseId === selectedCourse)
    );
    
    const total = filteredRecords.length;
    const present = filteredRecords.filter(r => r.status === 'present').length;
    const absent = filteredRecords.filter(r => r.status === 'absent').length;
    const late = filteredRecords.filter(r => r.status === 'late').length;
    const excused = filteredRecords.filter(r => r.status === 'excused').length;
    
    return {
      total,
      present,
      absent,
      late,
      excused,
      presentRate: total > 0 ? Math.round((present / total) * 100) : 0,
      absentRate: total > 0 ? Math.round((absent / total) * 100) : 0,
      lateRate: total > 0 ? Math.round((late / total) * 100) : 0,
      excusedRate: total > 0 ? Math.round((excused / total) * 100) : 0
    };
  };
  
  const stats = calculateStats(attendanceRecords);
  
  return (
    <div className="p-6 bg-[#F8E8E8] min-h-screen">
      <h1 className="text-2xl font-bold text-[#A01717] mb-6">Attendance & Evaluations</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#A01717] text-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-medium mb-1">Present Rate</p>
          <h3 className="text-3xl font-bold">{stats.presentRate}%</h3>
        </div>
        <div className="bg-[#A01717] text-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-medium mb-1">Absent Rate</p>
          <h3 className="text-3xl font-bold">{stats.absentRate}%</h3>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <input
          type="text"
          placeholder="Search student or course"
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Attendance;