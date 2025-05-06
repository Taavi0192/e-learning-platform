import express from "express";
import {
    signUp,
    login,
    logout,
    getStudentFees,
    markFeeAsPaid,
    getStudentFines, markFineAsPaid, getFeeDetail
} from "../controllers/studentController.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.get("/:studentId/fees", getStudentFees);
router.patch("/fees/:feeId/pay", markFeeAsPaid);
router.get("/:studentId/fines", getStudentFines);
router.patch("/fines/:fineId/pay", markFineAsPaid);

router.get("/fees/:feeId", getFeeDetail);

export default router;
