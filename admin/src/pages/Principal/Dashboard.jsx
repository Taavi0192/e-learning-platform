import React from 'react';
import { FiUsers, FiBookOpen, FiCalendar, FiBarChart2, FiCheckCircle, FiBell } from 'react-icons/fi';

const PrincipalDashboard = () => {
    // Mock data (to be replaced by API)
    const stats = {
        totalStudents: 843,
        totalTeachers: 47,
        activeCourses: 26,
        studentAttendance: '88%',
        teacherAttendance: '96%',
        certificatesIssued: 312,
    };

    const recentResults = [
        { id: 1, name: 'Maya Rodriguez', class: '10-A', score: '92%' },
        { id: 2, name: 'John Chen', class: '9-B', score: '85%' },
        { id: 3, name: 'Sarah Wilson', class: '11-C', score: '89%' },
        { id: 4, name: 'Raj Patel', class: '12-A', score: '78%' },
    ];

    const classAverages = [
        { id: 1, className: '10-A', average: '87%' },
        { id: 2, className: '9-B', average: '82%' },
        { id: 3, className: '11-C', average: '84%' },
    ];

    const upcomingSchedule = [
        { id: 1, course: 'React Fundamentals', instructor: 'Dr. Michael Lee', date: 'Today', time: '10:00 AM - 12:00 PM', location: 'Room 101' },
        { id: 2, course: 'Advanced JavaScript', instructor: 'Sarah Johnson', date: 'Today', time: '2:00 PM - 4:00 PM', location: 'Online' },
        { id: 3, course: 'UX/UI Design', instructor: 'Emma Thompson', date: 'Tomorrow', time: '9:00 AM - 11:00 AM', location: 'Design Lab' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Principal Dashboard</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">Total Students</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.totalStudents}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FiUsers className="h-6 w-6 text-[#19a4db]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">Total Teachers</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.totalTeachers}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FiUsers className="h-6 w-6 text-[#19a4db]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">Active Courses</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.activeCourses}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FiBookOpen className="h-6 w-6 text-[#19a4db]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">Student Attendance Today</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.studentAttendance}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FiCalendar className="h-6 w-6 text-[#19a4db]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">Teacher Attendance Today</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.teacherAttendance}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FiCalendar className="h-6 w-6 text-[#19a4db]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">Certificates Issued</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.certificatesIssued}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FiCheckCircle className="h-6 w-6 text-[#19a4db]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Results */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-gray-800">Recent Student Results</h2>
                    </div>
                    <div className="p-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {recentResults.map((result) => (
                                <tr key={result.id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{result.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.class}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.score}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Class Performance */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-gray-800">Class Performance Averages</h2>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-3">
                            {classAverages.map((cls) => (
                                <li key={cls.id} className="flex justify-between items-center border-b pb-2 last:border-none">
                                    <span className="text-sm text-gray-700">{cls.className}</span>
                                    <span className="text-sm font-semibold text-gray-900">{cls.average}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Upcoming Schedule */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-gray-800">Upcoming Schedule</h2>
                    </div>
                    <div className="p-4">
                        <div className="space-y-4">
                            {upcomingSchedule.map((schedule) => (
                                <div key={schedule.id} className="border border-gray-100 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{schedule.course}</h3>
                                            <p className="text-sm text-gray-600 mt-1">Instructor: {schedule.instructor}</p>
                                            <p className="text-sm text-gray-500 mt-1">{schedule.location}</p>
                                        </div>
                                        <div className="bg-blue-50 text-[#19a4db] px-3 py-1 rounded-lg text-sm font-medium">
                                            {schedule.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notices Board */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-lg text-gray-800">Notices Board</h2>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
                                <h3 className="font-medium text-yellow-800">Maintenance</h3>
                                <p className="text-sm text-yellow-700 mt-1">System maintenance scheduled for Sunday 2 AM.</p>
                            </div>
                            <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                                <h3 className="font-medium text-blue-800">Meeting</h3>
                                <p className="text-sm text-blue-700 mt-1">Staff meeting this Friday at 3 PM in the conference hall.</p>
                            </div>
                            <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg">
                                <h3 className="font-medium text-green-800">Event</h3>
                                <p className="text-sm text-green-700 mt-1">Annual Sports Day scheduled for next month.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrincipalDashboard;
