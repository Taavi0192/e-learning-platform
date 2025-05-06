import React, { useEffect, useState } from "react";
import axios from "axios";

const RevenueDetails = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const res = await axios.get("http://localhost:5000/api/ownerRoutes/revenue-details", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRevenueData(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch revenue details:", err);
                setLoading(false);
            }
        };

        fetchRevenue();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Revenue Details</h1>
            {loading ? (
                <p>Loading revenue data...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table className="min-w-full table-auto text-left text-sm">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Month</th>
                            <th className="px-4 py-2 border-b">Revenue</th>
                            <th className="px-4 py-2 border-b">Source</th>
                        </tr>
                        </thead>
                        <tbody>
                        {revenueData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-4 py-2 border-b">{item.month}</td>
                                <td className="px-4 py-2 border-b">Rs. {item.amount}</td>
                                <td className="px-4 py-2 border-b">{item.source}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RevenueDetails;
