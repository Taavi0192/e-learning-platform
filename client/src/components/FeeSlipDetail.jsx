import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCreditCard } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

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

const FeeSlipDetail = () => {
    const { feeId } = useParams();
    const navigate = useNavigate();
    const [fee, setFee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeeDetail = async () => {
            try {
                const res = await axios.get(`/api/studentRoute/fees/${feeId}`);
                setFee(res.data);
            } catch {
                setError("Could not load fee details.");
            } finally {
                setLoading(false);
            }
        };
        fetchFeeDetail();
    }, [feeId]);

    if (loading) return <p>Loading fee details…</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!fee) return <p>No fee found.</p>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm max-w-md mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center text-blue-600 hover:underline"
            >
                <FiArrowLeft className="mr-2" /> Back
            </button>

            <h1 className="text-2xl font-bold mb-4">Fee Details</h1>
            <div className="space-y-3">
                <div className="flex items-center">
                    <FiCreditCard className="text-gray-400 mr-2" />
                    <span className="font-medium">Month:</span>
                    <span className="ml-2">{fee.month}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-medium">Amount:</span>
                    <span className="ml-2">PKR {fee.amount}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-medium">Status:</span>
                    <span
                        className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(
                            fee.status
                        )}`}
                    >
            {fee.status}
          </span>
                </div>
                {/* add any other fields you have, e.g. fee.dueDate, fee.remarks */}
            </div>
        </div>
    );
};

export default FeeSlipDetail;
