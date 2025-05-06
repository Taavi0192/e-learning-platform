import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCreditCard, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StudentPayments = () => {
    const { user } = useAuth();
    const studentId = user?._id || user?.id;

    const [fees, setFees] = useState([]);
    const [fines, setFines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!studentId) return;

        const fetchPayments = async () => {
            try {
                const [feeRes, fineRes] = await Promise.all([
                    axios.get(`/api/studentRoute/${studentId}/fees`),
                    axios.get(`/api/studentRoute/${studentId}/fines`)
                ]);
                setFees(feeRes.data);
                setFines(fineRes.data);
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [studentId]);

    const handlePayFee = async (feeId) => {
        try {
            await axios.patch(`/api/studentRoute/fees/${feeId}/pay`);
            setFees((prev) =>
                prev.map((fee) =>
                    fee._id === feeId ? { ...fee, status: "paid" } : fee
                )
            );
            alert("Fee paid successfully!");
        } catch {
            alert("Failed to pay fee.");
        }
    };

    const handlePayFine = async (fineId) => {
        try {
            await axios.patch(`/api/studentRoute/fines/${fineId}/pay`);
            setFines((prev) =>
                prev.map((fine) =>
                    fine._id === fineId ? { ...fine, status: "paid" } : fine
                )
            );
            alert("Fine paid successfully!");
        } catch {
            alert("Failed to pay fine.");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "overdue":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) return <p>Loading payment records...</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Fee & Fine Payments</h1>

            {/* Fees Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Fee Payments</h2>

                {fees.length === 0 ? (
                    <p className="text-gray-600">No fee records found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Month
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {fees.map((fee) => (
                                <tr key={fee._id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        <Link
                                            to={`/student-dashboard/fees/${fee._id}`}
                                            className="flex items-center text-blue-600 hover:underline"
                                        >
                                            <FiCreditCard className="text-gray-400 mr-2" />
                                            {fee.month}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        PKR {fee.amount}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(
                              fee.status
                          )}`}
                      >
                        {fee.status}
                      </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {fee.status === "pending" ? (
                                            <button
                                                onClick={() => handlePayFee(fee._id)}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                            >
                                                Pay Now
                                            </button>
                                        ) : (
                                            <span className="text-green-600 text-sm">Paid</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Fines Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">
                    Fines & Security Deposits
                </h2>

                {fines.length === 0 ? (
                    <p className="text-gray-600">No fines found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reason
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Issued Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {fines.map((fine) => (
                                <tr key={fine._id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        <div className="flex items-center">
                                            <FiAlertCircle className="text-gray-400 mr-2" />
                                            {fine.reason}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        PKR {fine.amount}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        {new Date(fine.issuedDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(
                              fine.status
                          )}`}
                      >
                        {fine.status}
                      </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {fine.status === "pending" ? (
                                            <button
                                                onClick={() => handlePayFine(fine._id)}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                            >
                                                Pay Now
                                            </button>
                                        ) : (
                                            <span className="text-green-600 text-sm">Paid</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentPayments;
