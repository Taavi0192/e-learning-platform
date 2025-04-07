import express from "express";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.get("/dashboard", verifyAccessToken, (req, res) => {
    res.status(200).json({
        message: `Welcome Owner ${req.user.email}`,
    });
});

export default router;
