import mongoose from "mongoose";

const fineSecuritySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["fine", "security"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    issuedDate: {
        type: Date,
        default: Date.now,
    },
    appliedMonth: {
        type: String, // e.g. "April 2025"
        required: true,
    },
});

const FineSecurity = mongoose.model("FineSecurity", fineSecuritySchema);
export default FineSecurity;
