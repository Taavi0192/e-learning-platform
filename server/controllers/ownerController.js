import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Owner from "../models/ownerModel.js";
import Fee from "../models/Fee.js";
import FineSecurity from "../models/FineSecurity.js";
import staffSalaryModel from "../models/staffSalaryModel.js";
import Expense from "../models/expenseModel.js";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (owner) => {
    return jwt.sign(
        { id: owner._id, email: owner.email, role: "owner" },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

const generateRefreshToken = (owner) => {
    return jwt.sign(
        { id: owner._id, email: owner.email, role: "owner" },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(owner);
        const refreshToken = generateRefreshToken(owner);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const logoutOwner = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out successfully" });
};

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired refresh token" });
            }

            const owner = await Owner.findById(decoded.id);
            if (!owner) {
                return res.status(404).json({ message: "Owner not found" });
            }

            const newAccessToken = generateAccessToken(owner);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const getOwnerDashboard = async (req, res) => {
    try {
        res.json({ message: `Welcome Owner ${req.user.email}` });
    } catch (error) {
        res.status(500).json({ message: "Error loading dashboard" });
    }
};

export const getOwnerStats = async (req, res) => {
    try {
        const currentMonth = new Date().toISOString().slice(0, 7); // "2025-04"
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const lastMonth = lastMonthDate.toISOString().slice(0, 7);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const chartData = [];
        for (let i = 0; i < 12; i++) {
            const yearMonth = `${new Date().getFullYear()}-${String(i + 1).padStart(2, "0")}`;

            const feeRevenue = await Fee.aggregate([
                { $match: { status: "paid", month: yearMonth } },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);
            const fineRevenue = await FineSecurity.aggregate([
                { $match: { status: "paid", issuedDate: { $gte: new Date(`${yearMonth}-01`), $lt: new Date(`${yearMonth}-31`) } } },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);
            const salaryExpense = await staffSalaryModel.aggregate([
                { $match: { status: "paid", month: yearMonth } },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);
            const miscExpense = await Expense.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(`${yearMonth}-01`),
                            $lt: new Date(`${yearMonth}-31`)
                        }
                    }
                },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);

            const revenue = (feeRevenue[0]?.total || 0) + (fineRevenue[0]?.total || 0);
            const expense = (salaryExpense[0]?.total || 0) + (miscExpense[0]?.total || 0);
            const profit = revenue - expense;

            chartData.push({
                label: months[i],
                revenue,
                expense,
                profit
            });
        }

        const currentSummary = chartData[new Date().getMonth()];
        const lastSummary = chartData[new Date().getMonth() - 1] || { revenue: 0, expense: 0, profit: 0 };

        res.json({
            summary: {
                thisMonth: currentSummary,
                lastMonth: lastSummary,
            },
            chart: {
                labels: months,
                datasets: {
                    revenue: chartData.map((d) => d.revenue),
                    expense: chartData.map((d) => d.expense),
                    profit: chartData.map((d) => d.profit),
                }
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching owner stats", error: err.message });
    }
};

export const getExpenseBreakdown = async (req, res) => {
    try {
        const currentMonth = new Date().toISOString().slice(0, 7); // "2025-04"

        // Get paid salaries for current month
        const salarySum = await staffSalaryModel.aggregate([
            { $match: { status: "paid", month: currentMonth } },
            { $group: { _id: "Teacher Salaries", total: { $sum: "$amount" } } },
        ]);

        // Get expense categories for current month
        const expenseSums = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${currentMonth}-01`),
                        $lt: new Date(`${currentMonth}-31`),
                    },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                },
            },
        ]);

        const breakdown = [
            ...salarySum,
            ...expenseSums,
        ];

        res.json(breakdown);
    } catch (error) {
        console.error("Error getting expense breakdown:", error);
        res.status(500).json({ message: "Failed to fetch expense breakdown" });
    }
};

// ✅ 1️⃣ Revenue Details (combining Fee + FineSecurity)
export const getRevenueDetails = async (req, res) => {
    try {
        const feePayments = await Fee.find({ status: "paid" }).select("student amount month paymentDate");
        const fines = await FineSecurity.find({ status: "paid" }).select("student amount issuedDate");

        const formattedFees = feePayments.map((item) => ({
            type: "Fee",
            student: item.student,
            amount: item.amount,
            month: item.month,
            date: item.paymentDate,
        }));

        const formattedFines = fines.map((item) => ({
            type: "Fine",
            student: item.student,
            amount: item.amount,
            month: item.issuedDate?.toISOString().slice(0, 7),
            date: item.issuedDate,
        }));

        const combined = [...formattedFees, ...formattedFines].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(combined);
    } catch (error) {
        console.error("Failed to fetch revenue details:", error);
        res.status(500).json({ message: "Error fetching revenue details" });
    }
};

// ✅ 2️⃣ Expense Details (combining Salaries + Misc Expenses)
export const getExpenseDetails = async (req, res) => {
    try {
        const salaries = await staffSalaryModel.find({ status: "paid" }).select("teacher amount month payDate");
        const expenses = await Expense.find().select("category amount date notes");

        const formattedSalaries = salaries.map((item) => ({
            type: "Salary",
            recipient: item.teacher,
            amount: item.amount,
            category: "Teacher Salaries",
            month: item.month,
            date: item.payDate,
            notes: "",
        }));

        const formattedExpenses = expenses.map((item) => ({
            type: "Misc Expense",
            recipient: "",
            amount: item.amount,
            category: item.category,
            date: item.date,
            notes: item.notes || "",
        }));

        const combined = [...formattedSalaries, ...formattedExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(combined);
    } catch (error) {
        console.error("Failed to fetch expense details:", error);
        res.status(500).json({ message: "Error fetching expense details" });
    }
};

// ✅ 3️⃣ Profit Report (month-by-month)
export const getProfitReport = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const monthlyReport = [];

        for (let i = 0; i < 12; i++) {
            const monthStr = String(i + 1).padStart(2, "0");
            const yearMonth = `${currentYear}-${monthStr}`;

            const feeRevenue = await Fee.aggregate([
                { $match: { status: "paid", month: yearMonth } },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);

            const fineRevenue = await FineSecurity.aggregate([
                {
                    $match: {
                        status: "paid",
                        issuedDate: {
                            $gte: new Date(`${yearMonth}-01`),
                            $lt: new Date(`${yearMonth}-31`),
                        },
                    },
                },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);

            const salaryExpense = await staffSalaryModel.aggregate([
                { $match: { status: "paid", month: yearMonth } },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);

            const miscExpense = await Expense.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(`${yearMonth}-01`),
                            $lt: new Date(`${yearMonth}-31`),
                        },
                    },
                },
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);

            const revenue = (feeRevenue[0]?.total || 0) + (fineRevenue[0]?.total || 0);
            const expense = (salaryExpense[0]?.total || 0) + (miscExpense[0]?.total || 0);
            const profit = revenue - expense;

            monthlyReport.push({
                month: new Date(currentYear, i).toLocaleString("default", { month: "long", year: "numeric" }),
                revenue,
                expense,
                profit,
            });
        }

        res.status(200).json(monthlyReport);
    } catch (error) {
        console.error("Failed to fetch profit report:", error);
        res.status(500).json({ message: "Error fetching profit report" });
    }
};
