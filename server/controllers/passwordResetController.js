import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";
import OtpToken from "../models/OTP.js";
import sendOTPEmail from "../utils/emailServices.js";
import bcrypt from "bcryptjs";

// Generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Forgot Password - Send OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the email exists in either Teacher or Student model
    const teacher = await Teacher.findOne({ email });
    const student = await Student.findOne({ email });

    if (!teacher && !student) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    await OtpToken.deleteMany({ email }); // Delete existing OTPs for this email
    await new OtpToken({ email, otp }).save(); // Save new OTP

    await sendOTPEmail(email, otp); // Send OTP via email
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const validOtp = await OtpToken.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in either Teacher or Student model
    let user = await Teacher.findOne({ email });
    if (!user) {
      user = await Student.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
