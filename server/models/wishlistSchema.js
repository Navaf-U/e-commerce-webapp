import mongoose from "mongoose";
const wishlistSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const wishListModel = mongoose.models.WishList || mongoose.model("WishList",wishlistSchema)

export default wishListModel;