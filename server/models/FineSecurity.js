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
    amount: {
        type: Number,
        required: true,
    },
    issuedDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
    },
});

const FineSecurity = mongoose.model("FineSecurity", fineSecuritySchema);
export default FineSecurity;
