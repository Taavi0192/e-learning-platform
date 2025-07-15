import React from 'react';
import {
    FiUsers, FiBookOpen, FiCalendar, FiBell, FiBarChart2, FiCheckCircle, FiTrendingUp
} from 'react-icons/fi';

const PrincipalDashboard = () => {
    // Mock stats
    const stats = {
        totalStudents: 843,
        totalTeachers: 47,
        attendanceRate: '88%',
        feeCollection: '93%',
        certificatesIssued: 312,
        behaviorSummary: { warnings: 34, fines: 12, expulsions: 1 }
    };

    const topClasses = [
        { class: '10-A', avg: '92%' },
        { class: '9-B', avg: '88%' },
        { class: '11-C', avg: '85%' },
        { class: '12-A', avg: '81%' },
    ];

    const notifications = [
        {
            id: 1,
            type: 'alert',
            title: 'Power Maintenance',
            message: 'Scheduled power maintenance tomorrow from 9AM-11AM.',
            color: 'yellow'
        },
        {
            id: 2,
            type: 'info',
            title: 'Library Upgrade',
            message: 'New digital resources added to the library system.',
            color: 'blue'
        },
        {
            id: 3,
            type: 'success',
            title: 'Satisfaction Survey',
            message: 'Student satisfaction rose to 91%, up 4%.',
            color: 'green'
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Principal Dashboard</h1>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg hover:bg-[#1582af] transition-colors text-sm font-medium">
                        Export Summary
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Total Students" value={stats.totalStudents} icon={<FiUsers />} change="↑ 12%" />
                <StatCard title="Total Teachers" value={stats.totalTeachers} icon={<FiUsers />} change="↑ 4%" />
                <StatCard title="Attendance Rate" value={stats.attendanceRate} icon={<FiCalendar />} change="↓ 1%" color="yellow" />
                <StatCard title="Fee Collection" value={stats.feeCollection} icon={<FiCheckCircle />} change="↑ 2%" />
                <StatCard title="Certificates Issued" value={stats.certificatesIssued} icon={<FiBookOpen />} change="↑ 8%" />
                <StatCard title="Discipline Cases" value={`${stats.behaviorSummary.warnings + stats.behaviorSummary.fines + stats.behaviorSummary.expulsions}`} icon={<FiBell />} change="⚠" color="red" />
            </div>

            {/* Performance and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Classes */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-gray-800">Top Performing Classes</h2>
                        <span className="text-sm text-[#19a4db]">View Full Report</span>
                    </div>
                    <div className="p-4 space-y-3">
                        {topClasses.map((cls, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b pb-2">
                                <p className="font-medium text-gray-700">{cls.class}</p>
                                <span className="text-sm font-semibold text-green-600">{cls.avg}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Notifications */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-lg text-gray-800">System Notifications</h2>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {notifications.map((note) => (
                            <div
                                key={note.id}
                                className={`border-l-4 border-${note.color}-400 bg-${note.color}-50 p-4 rounded-r-lg`}
                            >
                                <h3 className={`font-medium text-${note.color}-800`}>{note.title}</h3>
                                <p className={`text-sm text-${note.color}-700 mt-1`}>{note.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Stat Card
const StatCard = ({ title, value, icon, change, color = 'green' }) => {
    const colorMap = {
        green: 'text-green-500',
        red: 'text-red-500',
        yellow: 'text-yellow-500'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
                    <p className={`${colorMap[color]} text-xs font-medium mt-2`}>{change}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                    {React.cloneElement(icon, { className: "h-6 w-6 text-[#19a4db]" })}
                </div>
            </div>
        </div>
    );
};

export default PrincipalDashboard;
