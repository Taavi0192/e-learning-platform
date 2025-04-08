import React from "react";

const FeeManagement = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-[#A01717]">Fee Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fee Slip Section */}
                <div className="p-4 border rounded-lg shadow-sm bg-[#FFF8F0]">
                    <h2 className="text-lg font-semibold mb-2 text-[#600000]">Send Fee Slip</h2>
                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Student Email"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="submit"
                            className="bg-[#A01717] hover:bg-[#800000] text-white px-4 py-2 rounded"
                        >
                            Send Fee Slip
                        </button>
                    </form>
                </div>

                {/* Record Payment Section */}
                <div className="p-4 border rounded-lg shadow-sm bg-[#F0F5FF]">
                    <h2 className="text-lg font-semibold mb-2 text-[#600000]">Record Payment</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Student ID"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Paid Amount"
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="submit"
                            className="bg-[#600000] hover:bg-[#3b0000] text-white px-4 py-2 rounded"
                        >
                            Record Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeeManagement;
