import mongoose from "mongoose";

const staffSalarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    remarks: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("StaffSalary", staffSalarySchema);