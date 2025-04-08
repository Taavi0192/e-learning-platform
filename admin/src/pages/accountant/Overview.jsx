import React from "react";
import { FaFileInvoiceDollar, FaUserGraduate, FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";

const Overview = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-[#A01717] mb-6">Accountant Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center space-x-4">
                        <FaFileInvoiceDollar className="text-[#A01717] text-3xl" />
                        <div>
                            <p className="text-gray-600">Pending Fee Slips</p>
                            <h2 className="text-xl font-semibold text-[#A01717]">32</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center space-x-4">
                        <FaUserGraduate className="text-[#A01717] text-3xl" />
                        <div>
                            <p className="text-gray-600">Students Paid</p>
                            <h2 className="text-xl font-semibold text-[#A01717]">120</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center space-x-4">
                        <FaMoneyCheckAlt className="text-[#A01717] text-3xl" />
                        <div>
                            <p className="text-gray-600">Salary Disbursed</p>
                            <h2 className="text-xl font-semibold text-[#A01717]">PKR 700,000</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center space-x-4">
                        <FaChartBar className="text-[#A01717] text-3xl" />
                        <div>
                            <p className="text-gray-600">Monthly Expenses</p>
                            <h2 className="text-xl font-semibold text-[#A01717]">PKR 150,000</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
