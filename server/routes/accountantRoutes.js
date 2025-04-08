import express from "express";
import {
    loginAccountant,
    logoutAccountant,
    refreshAccessToken,
    getAccountantDashboard,
} from "../controllers/accountantController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import {getAllStudents, getAllTeachers} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAccountant);
router.post("/logout", logoutAccountant);
router.post("/refresh-token", refreshAccessToken);
router.get("/dashboard", verifyAccessToken, getAccountantDashboard);

router.get("/teachers", verifyAccessToken, getAllTeachers);
router.get("/students", verifyAccessToken, getAllStudents);

export default router;
