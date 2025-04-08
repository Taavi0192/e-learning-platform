import StaffSalary from "../models/staffSalaryModel.js";

export const addSalary = async (req, res) => {
    try {
        const salary = await StaffSalary.create(req.body);
        res.status(201).json({ message: "Salary record created", salary });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getSalaries = async (req, res) => {
    try {
        const salaries = await StaffSalary.find().sort({ createdAt: -1 });
        res.status(200).json({ salaries });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteSalary = async (req, res) => {
    try {
        await StaffSalary.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Salary record deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};