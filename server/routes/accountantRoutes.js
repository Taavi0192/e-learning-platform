import express from "express";
import {
    loginAccountant,
    logoutAccountant,
    refreshAccessToken,
    getAccountantDashboard,
    getAllTeacherSalaries,
    markSalaryPaid,
    createExpense,
    getAllExpenses,
    deleteExpense,
    getAccountantDashboardStats, seedDashboardTestData,
} from "../controllers/accountantController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import {getAllStudents, getAllTeachers} from "../controllers/accountantController.js";

const router = express.Router();

router.post("/login", loginAccountant);
router.post("/logout", logoutAccountant);
router.post("/refresh-token", refreshAccessToken);
// router.get("/dashboard", verifyAccessToken, getAccountantDashboard);

router.get("/teachers", verifyAccessToken, getAllTeachers);
router.get("/students", verifyAccessToken, getAllStudents);
router.get("/teacher-salaries", verifyAccessToken, getAllTeacherSalaries);
router.patch("/mark-paid/:salaryId", verifyAccessToken, markSalaryPaid);

router.post("/", verifyAccessToken, createExpense);
router.get("/", verifyAccessToken, getAllExpenses);
router.delete("/:id", verifyAccessToken, deleteExpense);

router.get("/dashboard", verifyAccessToken, getAccountantDashboardStats);
router.post("/seed-dashboard", seedDashboardTestData);

export default router;
