import Accountant from "../models/accountantModel.js";
import bcrypt from "bcrypt";

// Default accountant credentials (use environment variables for production)
const DEFAULT_ACCOUNTANT_EMAIL = process.env.ACCOUNTANT_EMAIL || "accountant@elearn.com";
const DEFAULT_ACCOUNTANT_PASSWORD = process.env.ACCOUNTANT_PASSWORD || "accountant@elearn.com";

const initializeAccountant = async () => {
    try {
        const accountantExists = await Accountant.countDocuments();

        if (accountantExists === 0) {
            const hashedPassword = await bcrypt.hash(DEFAULT_ACCOUNTANT_PASSWORD, 10);
            const newAccountant = new Accountant({
                email: DEFAULT_ACCOUNTANT_EMAIL,
                password: hashedPassword,
            });

            await newAccountant.save();
            console.log("✅ Accountant created successfully");
        } else {
            console.log("ℹ️ Accountant already exists, skipping creation.");
        }
    } catch (error) {
        console.error("❌ Error initializing accountant:", error);
    }
};

export default initializeAccountant;
