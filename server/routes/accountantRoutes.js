import express from "express";
import {
    loginAccountant,
    logoutAccountant,
    refreshAccessToken,
    getAccountantDashboard,
} from "../controllers/accountantController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.post("/login", loginAccountant);
router.post("/logout", logoutAccountant);
router.post("/refresh-token", refreshAccessToken);
router.get("/dashboard", verifyAccessToken, getAccountantDashboard);

export default router;
