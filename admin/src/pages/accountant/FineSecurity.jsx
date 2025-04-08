import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiPlusCircle } from "react-icons/fi";

const FineSecurity = () => {
    const [entries, setEntries] = useState([]);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        studentId: "",
        reason: "",
        type: "fine",
        amount: "",
        issuedDate: "",
    });

    useEffect(() => {
        fetchEntries();
        fetchStudents();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/fines");
            setEntries(res.data.entries);
        } catch (err) {
            toast.error("Failed to fetch fine/security data");
        }
    };

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem("adminToken"); // Or "adminToken" if you're still reusing it
            const response = await axios.get("http://localhost:5000/api/accountantRoutes/students", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStudents(response.data.students);
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch students");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddEntry = async () => {
        try {
            await axios.post("http://localhost:5000/api/fines", formData);
            toast.success("Entry added");
            setFormData({
                studentId: "",
                reason: "",
                type: "fine",
                amount: "",
                issuedDate: "",
            });
            fetchEntries();
        } catch (err) {
            toast.error("Failed to add entry");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/fines/${id}`);
            toast.success("Entry deleted");
            fetchEntries();
        } catch (err) {
            toast.error("Failed to delete entry");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#600000]">Fine & Security Collection</h2>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                        <option key={student._id} value={student._id}>
                            {student.username} ({student.email})
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="reason"
                    placeholder="Reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                >
                    <option value="fine">Fine</option>
                    <option value="security">Security</option>
                </select>

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />

                <input
                    type="date"
                    name="issuedDate"
                    value={formData.issuedDate}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />

                <button
                    onClick={handleAddEntry}
                    className="col-span-1 md:col-span-3 bg-[#600000] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
                >
                    <FiPlusCircle /> Add Entry
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-left">
                    <thead className="bg-[#F8E8E8] text-[#600000]">
                    <tr>
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Reason</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Issued</th>
                        <th className="py-3 px-4">Applies To</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entries.map((entry) => (
                        <tr key={entry._id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">
                                {entry.studentId?.username || "N/A"}
                            </td>
                            <td className="py-2 px-4 capitalize">{entry.type}</td>
                            <td className="py-2 px-4">{entry.reason}</td>
                            <td className="py-2 px-4">Rs. {entry.amount}</td>
                            <td className="py-2 px-4">
                                {new Date(entry.issuedDate).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">{entry.appliedMonth}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleDelete(entry._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {entries.length === 0 && (
                    <div className="text-center text-gray-500 py-4">No entries found.</div>
                )}
            </div>
        </div>
    );
};

export default FineSecurity;
