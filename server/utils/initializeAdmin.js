import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";

// Default admin credentials (use environment variables for production)
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "elearn@admin.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "elearn@admin.com";

const initializeAdmin = async () => {
  try {
    // Check if an admin already exists
    const adminExists = await Admin.countDocuments();

    if (adminExists === 0) {
      // Admin does not exist, create one
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
      const newAdmin = new Admin({
        email: DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
      });

      await newAdmin.save();
      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists, skipping creation.");
    }
  } catch (error) {
    console.error("Error initializing admin:", error);
  }
};

export default initializeAdmin;
