import StaffSalary from "../models/staffSalaryModel.js";
import Teacher from "../models/teacherModel.js";

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

export const generateAllTeacherSalaries = async (req, res) => {
    try {
        const { month } = req.body;
        const teachers = await Teacher.find();

        const existingSalaries = await StaffSalary.find({ month });
        const existingMap = new Map(existingSalaries.map(s => [s.teacherId.toString(), true]));

        const newSalaries = teachers
            .filter(t => !existingMap.has(t._id.toString()))
            .map(t => ({
                teacherId: t._id,
                month,
                amount: 50000, // default or fetch from somewhere
                status: "unpaid",
            }));

        if (newSalaries.length === 0) {
            return res.json({ message: "Salary slips already generated for all teachers.", created: [] });
        }

        const created = await StaffSalary.insertMany(newSalaries);
        res.status(201).json({ message: `${created.length} salary slips generated`, created });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to generate salary slips", error: err.message });
    }
};
