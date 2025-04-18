import FineSecurity from "../models/FineSecurity.js";
import Student from "../models/studentModel.js";

export const addFineOrSecurity = async (req, res) => {
    try {
        const { studentId, reason, amount, issuedDate } = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const entry = new FineSecurity({
            studentId,
            reason,
            amount,
            issuedDate,
            status: "pending", // Default
        });

        await entry.save();
        res.status(201).json({ message: "Fine created", entry });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllFinesAndSecurity = async (req, res) => {
    try {
        const entries = await FineSecurity.find()
            .populate("studentId", "username email")
            .sort({ issuedDate: -1 });

        res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteFineOrSecurity = async (req, res) => {
    try {
        const { id } = req.params;
        await FineSecurity.findByIdAndDelete(id);
        res.status(200).json({ message: "Fine deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
