import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, min: 1 }
    },
  ],
},
  { timestamps: true }

);

export default mongoose.model("Cart", cartSchema);
