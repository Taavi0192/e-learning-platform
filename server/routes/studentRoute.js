import express from "express";
import { signUp, login, logout } from "../controllers/studentController.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
