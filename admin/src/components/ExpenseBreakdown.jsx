// components/ExpenseBreakdown.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// register the pie-chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseBreakdown = () => {
    const data = {
        labels: [
            "Teacher Salaries",
            "Repairs & Maintenance",
            "Utilities",
            "Supplies",
            "Other",
        ],
        datasets: [
            {
                label: "Expense Share",
                data: [180000, 50000, 30000, 20000, 20000],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
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
                text: "Expense Breakdown",
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default ExpenseBreakdown;
