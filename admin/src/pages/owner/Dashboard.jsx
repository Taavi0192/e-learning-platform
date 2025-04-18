import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ExpenseBreakdown from "../../components/ExpenseBreakdown";


// Register chart elements with ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    // Dummy data for this month and last month's profit, adjust as needed.
    const thisMonth = { revenue: 500000, expense: 300000, profit: 200000 };
    const lastMonth = { revenue: 450000, expense: 350000, profit: 100000 };

    // Dummy chart data for yearly trends.
    const chartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Revenue",
                data: [300000, 400000, 500000, 450000, 500000, 550000, 600000, 580000, 620000, 650000, 700000, 750000],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
            },
            {
                label: "Expense",
                data: [200000, 250000, 300000, 280000, 300000, 320000, 350000, 340000, 360000, 370000, 390000, 400000],
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
            },
            {
                label: "Profit/Loss",
                data: [100000, 150000, 200000, 170000, 200000, 230000, 250000, 240000, 260000, 280000, 310000, 350000],
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
            },
        ],
    };

    // Configuration options for the chart.
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            // title: {
            //     display: true,
            //     text: "Yearly Revenue, Expense, and Profit Trends",
            // },
        },
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8E8E8]">
            <div className="flex">
                <main className="flex-1 p-6 overflow-y-auto text-[#600000]">
                    <h1 className="text-3xl font-bold mb-4">Revenue Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* This Month's Revenue, Expense and Profit */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-2">This Month</h2>
                            <p className="text-sm">
                                <strong>Revenue:</strong> Rs. {thisMonth.revenue}
                            </p>
                            <p className="text-sm">
                                <strong>Expense:</strong> Rs. {thisMonth.expense}
                            </p>
                            <p className="text-sm text-green-600">
                                <strong>Profit:</strong> Rs. {thisMonth.profit}
                            </p>
                        </div>

                        {/* Last Month's Profit Comparison */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-2">Last Month</h2>
                            <p className="text-sm">
                                <strong>Revenue:</strong> Rs. {lastMonth.revenue}
                            </p>
                            <p className="text-sm">
                                <strong>Expense:</strong> Rs. {lastMonth.expense}
                            </p>
                            <p className="text-sm text-green-600">
                                <strong>Profit:</strong> Rs. {lastMonth.profit}
                            </p>
                        </div>
                    </div>

                    {/* Graph Showing Yearly Trends */}
                    <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-2">Yearly Trends</h2>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                    {/* New Expense Breakdown Pie Chart */}
                    <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
                        <ExpenseBreakdown />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
