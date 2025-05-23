import express from "express";
import {
    loginOwner,
    logoutOwner,
    refreshAccessToken,
    getOwnerDashboard, getOwnerStats, getExpenseBreakdown, getProfitReport, getExpenseDetails, getRevenueDetails,
} from "../controllers/ownerController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.post("/login", loginOwner);
router.post("/logout", logoutOwner);
router.post("/refresh-token", refreshAccessToken);
router.get("/owner-dashboard", verifyAccessToken, getOwnerDashboard);

router.get("/stats", verifyAccessToken, getOwnerStats);
router.get("/expense-breakdown", verifyAccessToken, getExpenseBreakdown);

router.get("/revenue-details", verifyAccessToken, getRevenueDetails);
router.get("/expense-details", verifyAccessToken, getExpenseDetails);
router.get("/profit-report", verifyAccessToken, getProfitReport);

export default router;
