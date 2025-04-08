import express from "express";
import { addSalary, getSalaries, deleteSalary } from "../controllers/staffSalaryController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyAccessToken, addSalary);
router.get("/", verifyAccessToken, getSalaries);
router.delete("/:id", verifyAccessToken, deleteSalary);

export default router;