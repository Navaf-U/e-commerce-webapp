import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Types.ObjectId, ref: "cart" },
    isBlocked: { type: Boolean, default: false },
  },
  { timesstamps: true }
);

const userModel = mongoose.model.User || mongoose.model("User", userSchema);
export default userModel;
