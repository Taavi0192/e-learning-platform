import express from "express";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import {loginPrincipal, logoutPrincipal, refreshAccessToken} from "../controllers/principalController.js";

const router = express.Router();

router.get("/dashboard", verifyAccessToken, (req, res) => {
    res.status(200).json({
        message: `Welcome Principal ${req.user.email}`,
    });
});

router.post('/login', loginPrincipal);
router.post("/logout", logoutPrincipal);
router.post("/refresh-token", refreshAccessToken);

export default router;
