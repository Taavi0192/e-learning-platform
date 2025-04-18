    import mongoose from "mongoose";

    const FeeSchema = new mongoose.Schema({
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        amount: { type: Number, required: true, default: 10000 },
        status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" },
        month: { type: String, required: true }, // e.g. "2025-04"
    }, { timestamps: true });

    const Fee = mongoose.model("Fee", FeeSchema);
    export default Fee;