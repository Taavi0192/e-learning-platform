import React, { useState, useEffect } from "react";
import axios from "axios";

const FeeManagement = () => {
    const [feeSlips, setFeeSlips]     = useState([]);
    const [loading, setLoading]       = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

    // Fetch slips
    const fetchFeeSlips = async () => {
        setLoading(true);
        setInfoMessage("");
        try {
            const { data } = await axios.get(`/api/fees?month=${currentMonth}`);
            setFeeSlips(data);
        } catch (err) {
            console.error("Error fetching fees:", err);
            setInfoMessage("Failed to load fee slips.");
        } finally {
            setLoading(false);
        }
    };

    // Generate only missing slips
    const generateAllSlips = async () => {
        setLoading(true);
        setInfoMessage("");
        try {
            const { data } = await axios.post("/api/fees/generate-all", { month: currentMonth });
            if (data.created.length === 0) {
                setInfoMessage(data.message);
            } else {
                setInfoMessage(data.message);
                await fetchFeeSlips();
            }
        } catch (err) {
            console.error("Error generating fee slips:", err);
            setInfoMessage("Error generating fee slips.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeeSlips();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-[#A01717]">Fee Management</h1>

            <div className="flex justify-end mb-4">
                <button
                    onClick={generateAllSlips}
                    disabled={loading}
                    className="bg-[#A01717] hover:bg-[#800000] text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Please wait…" : "Generate All Fee Slips"}
                </button>
            </div>

            {infoMessage && (
                <div className="mb-4 text-blue-600 font-medium">
                    {infoMessage}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-[#F0F5FF]">
                        <th className="px-4 py-2 border">Student</th>
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Month</th>
                        <th className="px-4 py-2 border">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feeSlips.map((fee) => (
                        <tr key={fee._id}>
                            <td className="px-4 py-2 border">
                                {fee.student.username}
                            </td>
                            <td className="px-4 py-2 border">{fee.amount}</td>
                            <td className="px-4 py-2 border capitalize">
                                {fee.status}
                            </td>
                            <td className="px-4 py-2 border">{fee.month}</td>
                            <td className="px-4 py-2 border">
                                {new Date(fee.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeeManagement;
