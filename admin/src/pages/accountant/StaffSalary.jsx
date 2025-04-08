import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";

const TeacherPayments = () => {
    const [teachers, setTeachers] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/accountantRoutes/teachers", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeachers(res.data.teachers);
        } catch (error) {
            toast.error("Failed to fetch teachers");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSalaries = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/accountantRoutes/teacher-salaries", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSalaries(res.data.salaries);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch salary data");
        }
    };

    const handlePay = async (salaryId) => {
        try {
            await axios.patch(`http://localhost:5000/api/accountantRoutes/mark-paid/${salaryId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
            });
            toast.success("Marked as paid");
            fetchSalaries();
        } catch (err) {
            toast.error("Could not update salary status");
        }
    };

    useEffect(() => {
        fetchTeachers();
        fetchSalaries();
    }, []);

    const getSalaryInfo = (teacherId) => salaries.find(s => s.teacherId._id === teacherId);

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#600000]">Teacher Salary Management</h2>

            {loading ? (
                <div className="text-center text-gray-500 py-10">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-left border">
                        <thead className="bg-[#F8E8E8] text-[#600000]">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teachers.map(teacher => {
                            const salary = getSalaryInfo(teacher._id);
                            return (
                                <tr key={teacher._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{teacher.username}</td>
                                    <td className="py-3 px-4">{teacher.email}</td>
                                    <td className="py-3 px-4">Rs. {salary?.amount || "0"}</td>
                                    <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                salary?.status === "paid"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-800"
                                            }`}>
                                                {salary?.status || "unpaid"}
                                            </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {salary?.status !== "paid" ? (
                                            <button
                                                onClick={() => handlePay(salary._id)}
                                                className="flex items-center gap-2 text-sm bg-[#600000] hover:opacity-90 text-white py-2 px-4 rounded-lg transition"
                                            >
                                                <FiCheckCircle />
                                                Pay Now
                                            </button>
                                        ) : (
                                            <span className="text-green-600 font-medium text-sm">Paid</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    {teachers.length === 0 && (
                        <div className="text-center text-gray-500 py-6">
                            No teachers found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeacherPayments;
