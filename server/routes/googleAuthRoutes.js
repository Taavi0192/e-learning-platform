import express from "express";
import {
  googleLogin,
  googleCallback,
  logout,
} from "../controllers/googleAuthController.js";

const router = express.Router();

// Google OAuth login
router.get("/google", (req, res, next) => {
  const role = req.query.role; // Get role from query params
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: role, // Pass role as state
  })(req, res, next);
});

// Google OAuth callback
router.get("/google/callback", googleCallback);

// Logout
router.get("/logout", logout);

export default router;
