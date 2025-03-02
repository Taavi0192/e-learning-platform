import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import cookieParser from "cookie-parser";
import passwordReset from "./routes/passwordReset.js";

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
app.use(cookieParser());

app.use(express.json());

// Routes
app.use("/api/studentRoute", studentRoutes);
app.use("/api/teacherRoutes", teacherRoutes);
app.use("/api/adminRoutes", adminRoutes);
app.use("/api/resetpassword", passwordReset);

export default app;
