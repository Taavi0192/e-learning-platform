import FineSecurity from "../models/FineSecurity.js";
import Student from "../models/studentModel.js";

// Utility: Get next month in "Month YYYY" format
const getNextMonth = (date) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
};

// Add a new fine or security entry
export const addFineOrSecurity = async (req, res) => {
    try {
        const { studentId, reason, type, amount, issuedDate } = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const appliedMonth = getNextMonth(issuedDate || new Date());

        const entry = new FineSecurity({
            studentId,
            reason,
            type,
            amount,
            issuedDate,
            appliedMonth,
        });

        await entry.save();
        res.status(201).json({ message: "Entry created", entry });
    } catch (error) {
        console.error("Add fine/security error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all fines and security entries
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

// Delete a fine/security entry
export const deleteFineOrSecurity = async (req, res) => {
    try {
        const { id } = req.params;
        await FineSecurity.findByIdAndDelete(id);
        res.status(200).json({ message: "Entry deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
