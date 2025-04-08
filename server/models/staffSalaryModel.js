import mongoose from "mongoose";

const staffSalarySchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    remarks: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("StaffSalary", staffSalarySchema);