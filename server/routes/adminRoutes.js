import express from "express";
import { loginAdmin, logoutAdmin  , refreshAccessToken} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAccessToken);


export default router;
