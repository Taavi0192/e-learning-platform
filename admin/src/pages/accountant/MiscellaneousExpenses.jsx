import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const MiscellaneousExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: "",
        description: "",
    });

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(res.data.expenses);
        } catch (error) {
            toast.error("Failed to load expenses");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddExpense = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            await axios.post("http://localhost:5000/api/expenses", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Expense added");
            setFormData({ title: "", amount: "", date: "", description: "" });
            fetchExpenses();
        } catch (error) {
            toast.error("Failed to add expense");
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Expense deleted");
            fetchExpenses();
        } catch (error) {
            toast.error("Failed to delete expense");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#600000]">Miscellaneous Expenses</h2>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    value={formData.title}
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
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="p-3 border rounded-lg"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="col-span-1 md:col-span-2 p-3 border rounded-lg"
                />
                <button
                    type="button"
                    onClick={handleAddExpense}
                    className="col-span-1 md:col-span-3 bg-[#600000] text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:opacity-90 transition"
                >
                    <FiPlusCircle /> Add Expense
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-left">
                    <thead className="bg-[#F8E8E8] text-[#600000]">
                    <tr>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Description</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense._id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{expense.title}</td>
                            <td className="py-2 px-4">Rs. {expense.amount}</td>
                            <td className="py-2 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                            <td className="py-2 px-4">{expense.description}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleDelete(expense._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {expenses.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        No miscellaneous expenses found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MiscellaneousExpenses;
