import express from "express";
import Fee     from "../models/Fee.js";
import Student from "../models/studentModel.js";

const router = express.Router();

// GET /api/fees?month=YYYY-MM
router.get("/", async (req, res) => {
    const { month } = req.query;
    try {
        const fees = await Fee
            .find({ month })
            .populate("student", "username email");
        return res.json(fees);
    } catch (err) {
        console.error("Error fetching fees:", err);
        return res.status(500).json({ message: "Server error fetching fees" });
    }
});

// POST /api/fees/generate-all
// body: { month: "YYYY-MM" }
router.post("/generate-all", async (req, res) => {
    const { month } = req.body;

    try {
        // 1) all students
        const students = await Student.find({ role: "student" });
        // 2) existing slips this month
        const existing = await Fee.find({ month }).select("student");
        const existingIds = new Set(existing.map(f => f.student.toString()));

        // 3) filter out those already with a slip
        const toCreate = students.filter(s => !existingIds.has(s._id.toString()));
        if (toCreate.length === 0) {
            return res.json({ created: [], message: "Fee slips already sent to all students this month" });
        }

        // 4) build & insert
        const docs = toCreate.map(s => ({ student: s._id, month }));
        const created = await Fee.insertMany(docs);

        return res.json({
            created,
            message: `${created.length} fee slip${created.length > 1 ? "s" : ""} generated`
        });
    } catch (err) {
        console.error("Error generating fees:", err);
        return res.status(500).json({ message: "Server error generating fees" });
    }
});

export default router;
