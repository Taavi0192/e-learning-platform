import Owner from "../models/ownerModel.js";
import bcrypt from "bcrypt";

// Default owner credentials (use environment variables in production)
const DEFAULT_OWNER_EMAIL = process.env.OWNER_EMAIL || "elearn@owner.com";
const DEFAULT_OWNER_PASSWORD = process.env.OWNER_PASSWORD || "elearn@owner.com";

const initializeOwner = async () => {
    try {
        const ownerExists = await Owner.countDocuments();

        if (ownerExists === 0) {
            const hashedPassword = await bcrypt.hash(DEFAULT_OWNER_PASSWORD, 10);
            const newOwner = new Owner({
                email: DEFAULT_OWNER_EMAIL,
                password: hashedPassword,
            });

            await newOwner.save();
            console.log("Owner created successfully");
        } else {
            console.log("Owner already exists, skipping creation.");
        }
    } catch (error) {
        console.error("Error initializing owner:", error);
    }
};

export default initializeOwner;
