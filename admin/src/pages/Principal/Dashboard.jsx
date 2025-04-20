import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const dummyStats = {
        capacity: 5704,
        enrollment: 5152,
        present: 5152,
        absent: 552, // NEW!
        presentRate: 100,
        behavior: {
            warnings: 125,
            fines: 88,
            expulsions: 12,
        },
    };

    const attendanceChart = {
        labels: ['Pre-K', 'KG', '01', '02', '03', '04', '05', '06', '07', '08'],
        datasets: [
            {
                label: 'Present',
                backgroundColor: '#16a34a',
                data: [240, 300, 410, 390, 380, 360, 350, 335, 320, 310],
            },
            {
                label: 'Absent',
                backgroundColor: '#dc2626',
                data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
            },
        ],
    };

    const absences = {
        "2023-06-10": "green",
        "2023-06-11": "yellow",
        "2023-06-12": "red",
        "2023-06-15": "yellow",
        "2023-06-20": "red"
    };

    const daysInMonth = 30;
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });

    const renderCalendar = () => {
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `2023-06-${String(day).padStart(2, '0')}`;
            const color = absences[dateKey];
            let bgColor = 'bg-gray-100';
            if (color === 'green') bgColor = 'bg-green-200';
            else if (color === 'yellow') bgColor = 'bg-yellow-200';
            else if (color === 'red') bgColor = 'bg-red-200';

            days.push(
                <div key={day} className={`text-center p-2 rounded ${bgColor}`}>
                    {day}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="p-6 bg-[#F8E8E8] min-h-screen space-y-10">
            <h1 className="text-3xl font-bold text-[#A01717] mb-6">Campus Compass</h1>

            {/* ✅ Finalized 6-Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <KPI title="Capacity" value={dummyStats.capacity} />
                <KPI title="Enrollment" value={dummyStats.enrollment} />
                <KPI title="Present" value={dummyStats.present} />
                <KPI title="Absents" value={dummyStats.absent} isWarning />
                <KPI title="% Present" value={`${dummyStats.presentRate}%`} isSuccess />
            </div>

            {/* Bar Chart + Behavior Stats side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold text-[#A01717] mb-4">Attendance by Grade</h2>
                    <Bar
                        data={attendanceChart}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: { color: '#374151' }
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 450,
                                    ticks: { color: '#374151' }
                                },
                                x: {
                                    ticks: { color: '#374151' }
                                }
                            },
                        }}
                    />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold text-[#A01717] mb-4">Behavior Overview</h2>
                    <div className="space-y-4">
                        <BehaviorStat label="Warnings" count={dummyStats.behavior.warnings} color="bg-yellow-100 text-yellow-800" />
                        <BehaviorStat label="Fines" count={dummyStats.behavior.fines} color="bg-blue-100 text-blue-800" />
                        <BehaviorStat label="Expulsions" count={dummyStats.behavior.expulsions} color="bg-red-100 text-red-800" />
                    </div>
                </div>
            </div>

            {/* Teacher Absence Calendar */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-[#A01717] mb-4">Teacher Absences This Month</h2>
                <p className="text-sm text-gray-600 mb-2">{currentMonth} 2023</p>
                <div className="grid grid-cols-7 gap-2">
                    {renderCalendar()}
                </div>
                <div className="mt-4 flex space-x-4 text-sm text-gray-700">
                    <span className="flex items-center">
                        <span className="w-4 h-4 rounded bg-green-200 mr-1"></span> 1-2 Absences
                    </span>
                    <span className="flex items-center">
                        <span className="w-4 h-4 rounded bg-yellow-200 mr-1"></span> 3-4 Absences
                    </span>
                    <span className="flex items-center">
                        <span className="w-4 h-4 rounded bg-red-200 mr-1"></span> 5+ Absences
                    </span>
                </div>
            </div>
        </div>
    );
};

const KPI = ({ title, value, isSuccess = false, isWarning = false, small = false }) => {
    const color = isSuccess ? 'text-green-600' : isWarning ? 'text-yellow-600' : 'text-gray-800';
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between">
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
            {small && <p className="text-xs text-gray-400 mt-1">(breakdown shown)</p>}
        </div>
    );
};

const BehaviorStat = ({ label, count, color }) => (
    <div className={`p-4 rounded-lg ${color} shadow-sm`}>
        <p className="text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-bold">{count}</h3>
    </div>
);

export default Dashboard;
