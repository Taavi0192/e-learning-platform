import mongoose from "mongoose";

const principalSchema = new mongoose.Schema(
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
            default: "principal",
            enum: ["principal"],
        },
    },
    { timestamps: true }
);

const Principal = mongoose.model("Principal", principalSchema);

export default Principal;
