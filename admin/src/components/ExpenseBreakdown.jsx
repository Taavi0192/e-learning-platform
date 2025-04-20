import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseBreakdown = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBreakdown = async () => {
            try {
                const token = localStorage.getItem("ownerToken");
                const res = await axios.get("http://localhost:5000/api/ownerRoutes/expense-breakdown", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data;
                setLabels(data.map((item) => item._id));
                setValues(data.map((item) => item.total));
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch expense breakdown:", err);
                setLoading(false);
            }
        };

        fetchBreakdown();
    }, []);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Expense Share",
                data: values,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: "Expense Breakdown (This Month)",
            },
        },
    };

    if (loading) return <p className="text-gray-500">Loading breakdown...</p>;

    return <Pie data={chartData} options={options} />;
};

export default ExpenseBreakdown;
