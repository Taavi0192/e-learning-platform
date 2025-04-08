import Expense from "../models/expenseModel.js";

// Get all expenses
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch expenses", error });
    }
};

// Add a new expense
export const addExpense = async (req, res) => {
    try {
        const newExpense = new Expense(req.body);
        await newExpense.save();
        res.status(201).json({ message: "Expense recorded", expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: "Failed to add expense", error });
    }
};

// Delete expense
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete expense", error });
    }
};
