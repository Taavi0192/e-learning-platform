import mongoose from "mongoose";

const OtpTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // Expires in 10 minutes
});

export default mongoose.model("OtpToken", OtpTokenSchema);
