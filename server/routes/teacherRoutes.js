import express from "express";
import { signUp, login, logout } from "../controllers/teacherController.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
