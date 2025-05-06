import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpensesDetails = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const res = await axios.get("http://localhost:5000/api/ownerRoutes/expense-details", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExpenseData(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch expenses:", err);
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Expenses Details</h1>
            {loading ? (
                <p>Loading expense data...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table className="min-w-full table-auto text-left text-sm">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Date</th>
                            <th className="px-4 py-2 border-b">Category</th>
                            <th className="px-4 py-2 border-b">Amount</th>
                            <th className="px-4 py-2 border-b">Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {expenseData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-4 py-2 border-b">{item.date}</td>
                                <td className="px-4 py-2 border-b">{item.category}</td>
                                <td className="px-4 py-2 border-b">Rs. {item.amount}</td>
                                <td className="px-4 py-2 border-b">{item.notes}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExpensesDetails;
