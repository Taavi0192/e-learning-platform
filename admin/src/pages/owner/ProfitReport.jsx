import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfitReport = () => {
    const [profitData, setProfitData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfit = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const res = await axios.get("http://localhost:5000/api/ownerRoutes/profit-report", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfitData(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch profit report:", err);
                setLoading(false);
            }
        };

        fetchProfit();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Profit/Loss Report</h1>
            {loading ? (
                <p>Loading profit/loss data...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table className="min-w-full table-auto text-left text-sm">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Month</th>
                            <th className="px-4 py-2 border-b">Revenue</th>
                            <th className="px-4 py-2 border-b">Expense</th>
                            <th className="px-4 py-2 border-b">Profit/Loss</th>
                        </tr>
                        </thead>
                        <tbody>
                        {profitData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-4 py-2 border-b">{item.month}</td>
                                <td className="px-4 py-2 border-b">Rs. {item.revenue}</td>
                                <td className="px-4 py-2 border-b">Rs. {item.expense}</td>
                                <td className="px-4 py-2 border-b text-green-600">
                                    Rs. {item.revenue - item.expense}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProfitReport;
