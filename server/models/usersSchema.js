import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;