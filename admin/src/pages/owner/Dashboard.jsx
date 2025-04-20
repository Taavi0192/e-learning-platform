// ...imports remain unchanged
import {
    Chart as ChartJS,
    CategoryScale,   // THIS is the fix for the "category" error
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";


import ExpenseBreakdown from "../../components/ExpenseBreakdown";
import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";
import axios from "axios";

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
    const [thisMonth, setThisMonth] = useState({});
    const [lastMonth, setLastMonth] = useState({});
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const res = await axios.get("http://localhost:5000/api/ownerRoutes/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data;
                setThisMonth(data.summary.thisMonth || {});
                setLastMonth(data.summary.lastMonth || {});

                setChartData({
                    labels: data.chart.labels,
                    datasets: [
                        {
                            label: "Revenue",
                            data: data.chart.datasets.revenue,
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                        },
                        {
                            label: "Expense",
                            data: data.chart.datasets.expense,
                            borderColor: "red",
                            backgroundColor: "rgba(255, 0, 0, 0.1)",
                        },
                        {
                            label: "Profit/Loss",
                            data: data.chart.datasets.profit,
                            borderColor: "green",
                            backgroundColor: "rgba(0, 255, 0, 0.1)",
                        },
                    ],
                });

                setLoading(false);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8E8E8]">
            <div className="flex">
                <main className="flex-1 p-6 overflow-y-auto text-[#600000]">
                    <h1 className="text-3xl font-bold mb-4">Revenue Overview</h1>

                    {loading ? (
                        <p className="text-lg text-gray-600">Loading stats...</p>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* This Month */}
                            <div className="bg-white shadow-sm rounded-lg p-6 h-full">
                                <h2 className="text-lg font-semibold mb-2">This Month</h2>
                                <p className="text-sm">
                                    <strong>Revenue:</strong> Rs. {thisMonth.revenue ?? "-"}
                                </p>
                                <p className="text-sm">
                                    <strong>Expense:</strong> Rs. {thisMonth.expense ?? "-"}
                                </p>
                                <p className="text-sm text-green-600">
                                    <strong>Profit:</strong>{" "}
                                    Rs. {(thisMonth.revenue ?? 0) - (thisMonth.expense ?? 0)}
                                </p>
                            </div>

                            {/* Last Month */}
                            <div className="bg-white shadow-sm rounded-lg p-6 h-full">
                                <h2 className="text-lg font-semibold mb-2">Last Month</h2>
                                <p className="text-sm">
                                    <strong>Revenue:</strong> Rs. {lastMonth.revenue ?? "-"}
                                </p>
                                <p className="text-sm">
                                    <strong>Expense:</strong> Rs. {lastMonth.expense ?? "-"}
                                </p>
                                <p className="text-sm text-green-600">
                                    <strong>Profit:</strong>{" "}
                                    Rs. {(lastMonth.revenue ?? 0) - (lastMonth.expense ?? 0)}
                                </p>
                            </div>

                            {/* Yearly Line Chart */}
                            <div className="bg-white shadow-sm rounded-lg p-6 h-[300px]">
                                <h2 className="text-lg font-semibold mb-2">Yearly Trends</h2>
                                {chartData ? (
                                    <div className="h-[220px]">
                                        <Line data={chartData} options={chartOptions} />
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No chart data available</p>
                                )}
                            </div>

                            {/* Pie Chart */}
                            <div className="bg-white shadow-sm rounded-lg p-6 h-[300px]">
                                <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
                                <div className="h-[220px]">
                                    <ExpenseBreakdown />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
