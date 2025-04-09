import Principal from "../models/principalModel.js";
import bcrypt from "bcrypt";

// Default principal credentials
const DEFAULT_PRINCIPAL_EMAIL = process.env.PRINCIPAL_EMAIL || "elearn@principal.com";
const DEFAULT_PRINCIPAL_PASSWORD = process.env.PRINCIPAL_PASSWORD || "elearn@principal.com";

const initializePrincipal = async () => {
    try {
        const principalExists = await Principal.countDocuments();

        if (principalExists === 0) {
            const hashedPassword = await bcrypt.hash(DEFAULT_PRINCIPAL_PASSWORD, 10);
            const newPrincipal = new Principal({
                email: DEFAULT_PRINCIPAL_EMAIL,
                password: hashedPassword,
            });

            await newPrincipal.save();
            console.log("Principal created successfully");
        } else {
            console.log("Principal already exists, skipping creation.");
        }
    } catch (error) {
        console.error("Error initializing principal:", error);
    }
};

export default initializePrincipal;
