import mongoose from "mongoose";
import initializeAdmin from "../utils/initializeAdmin.js";
import initializeAccountant from "../utils/initializeAccountant.js";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        initializeAdmin();
        initializeAccountant();
      }); 
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
