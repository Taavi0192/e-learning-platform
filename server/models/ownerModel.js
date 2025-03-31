import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
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
            default: "owner",
            enum: ["owner"],
        },
    },
    { timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
