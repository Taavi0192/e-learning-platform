import React, { useEffect, useState } from "react";
import {
    FiFileText,
    FiUserCheck,
    FiCreditCard,
    FiBarChart2,
    FiDollarSign,
} from "react-icons/fi";
import axios from "axios";

const Overview = () => {
    const [data, setData] = useState({
        pendingFeeSlips: 0,
        studentsPaid: 0,
        salaryDisbursed: 0,
        salaryPending: 0,
        monthlyExpenses: 0,
    });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/accountantRoutes/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(res.data);
        } catch (error) {
            console.error("Error loading accountant dashboard:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Accountant Dashboard</h1>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-[#A01717] text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                        Export Data
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                        Refresh
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card icon={<FiFileText />} label="Pending Fee Slips" value={data.pendingFeeSlips} />
                <Card icon={<FiUserCheck />} label="Students Paid" value={data.studentsPaid} />
                <Card icon={<FiDollarSign />} label="Salaries Paid" value={data.salaryDisbursed} />
                <Card icon={<FiCreditCard />} label="Salaries Unpaid" value={data.salaryPending} />
                <Card icon={<FiBarChart2 />} label="This Month's Expenses" value={data.monthlyExpenses} />
            </div>
        </div>
    );
};

const Card = ({ icon, label, value }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
                {React.cloneElement(icon, { className: "h-6 w-6 text-[#A01717]" })}
            </div>
        </div>
    </div>
);

export default Overview;
