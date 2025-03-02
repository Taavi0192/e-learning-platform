import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import cookieParser from "cookie-parser";
import passwordReset from "./routes/passwordReset.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import passport from "passport";
import session from "express-session";

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a secret key from your .env file
    resave: false, // Don't save the session if it wasn't modified
    saveUninitialized: false, // Don't create a session until something is stored
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Session duration (e.g., 1 day)
    },
  })
);

app.use(cookieParser());
app.use(express.json());

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/studentRoute", studentRoutes);
app.use("/api/teacherRoutes", teacherRoutes);
app.use("/api/adminRoutes", adminRoutes);
app.use("/api/resetpassword", passwordReset);
app.use("/api/googleAuth", googleAuthRoutes);

export default app;
