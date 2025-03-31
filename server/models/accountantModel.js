import mongoose from "mongoose";

const accountantSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "accountant",
            enum: ["accountant"],
        },
    },
    { timestamps: true }
);

const Accountant = mongoose.model("Accountant", accountantSchema);

export default Accountant;
