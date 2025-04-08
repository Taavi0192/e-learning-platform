import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const StaffSalary = () => {
    const [salaries, setSalaries] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        month: "",
        amount: "",
        status: "unpaid",
        remarks: "",
    });

    const fetchSalaries = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/salary");
            setSalaries(res.data.salaries);
        } catch (error) {
            console.error("Failed to fetch salaries:", error);
            toast.error("Failed to load salary records");
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSalary = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/salary", formData);
            toast.success("Salary added successfully");
            setFormData({
                name: "",
                role: "",
                month: "",
                amount: "",
                status: "unpaid",
                remarks: "",
            });
            fetchSalaries();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add salary");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/salary/${id}`);
            toast.success("Salary deleted");
            fetchSalaries();
        } catch (error) {
            toast.error("Failed to delete salary");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#600000]">Staff Salary Management</h2>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    name="name"
                    placeholder="Staff Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />
                <input
                    type="text"
                    name="month"
                    placeholder="Month (e.g. May 2024)"
                    value={formData.month}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                </select>
                <input
                    type="text"
                    name="remarks"
                    placeholder="Remarks (optional)"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />
                <button
                    type="button"
                    onClick={handleAddSalary}
                    className="col-span-1 md:col-span-3 bg-[#600000] text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:opacity-90 transition"
                >
                    <FiPlusCircle /> Add Salary
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-left">
                    <thead className="bg-[#F8E8E8] text-[#600000]">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Month</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Remarks</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salaries.map((item) => (
                        <tr key={item._id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.role}</td>
                            <td className="py-2 px-4">{item.month}</td>
                            <td className="py-2 px-4">Rs. {item.amount}</td>
                            <td className="py-2 px-4">
                  <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "paid"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                      }`}
                  >
                    {item.status}
                  </span>
                            </td>
                            <td className="py-2 px-4">{item.remarks}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {salaries.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        No salary records found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffSalary;
