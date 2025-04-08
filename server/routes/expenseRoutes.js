import express from "express";
import { getExpenses, addExpense, deleteExpense } from "../controllers/expenseController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyAccessToken, getExpenses);
router.post("/", verifyAccessToken, addExpense);
router.delete("/:id", verifyAccessToken, deleteExpense);

export default router;
