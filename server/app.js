import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import accountantRoutes from "./routes/accountantRoutes.js";
import principalRoutes from "./routes/principalRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import cookieParser from "cookie-parser";
import passwordReset from "./routes/passwordReset.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import passport from "passport";
import session from "express-session";
import courseRoutes from "./routes/courseRoutes.js";
import path from "path";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import staffSalaryRoutes from "./routes/staffSalaryRoutes.js";
import fineRoutes from "./routes/fineRoutes.js";
import expenseRoutes from "./routes/AccountantRoutes.js";

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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

// Serve static files from the 'uploads' folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/studentRoute", studentRoutes);
app.use("/api/teacherRoutes", teacherRoutes);
app.use("/api/adminRoutes", adminRoutes);
app.use("/api/resetpassword", passwordReset);
app.use("/api/googleAuth", googleAuthRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/accountantRoutes", accountantRoutes);
app.use("/api/principalRoutes", principalRoutes);
app.use("/api/ownerRoutes", ownerRoutes);
app.use("/api/salary", staffSalaryRoutes);
app.use("/api/fines", fineRoutes);
app.use("/api/expenses", expenseRoutes);



export default app;
