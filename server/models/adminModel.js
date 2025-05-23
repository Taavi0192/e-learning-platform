import mongoose from "mongoose";

// Admin schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enum: ["admin"],
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
