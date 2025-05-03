import Cart from "../../models/cartSchema.js";
import CustomError from "../../utils/customError.js";

const getUserCart = async (req, res) => {
  const data = await Cart.findOne({ userID: req.user.id }).populate({
    path: "products.productID",
    select: "name price image",
  });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(200).json({ products: [] });
  }
};

const updateUserCart = async (req, res, next) => {
  const { productID, quantity } = req.body;

  if (!productID || !quantity) {
    return next(new CustomError("Product ID and quantity are required.", 400));
  }
  if (quantity < 1) {
    next(new CustomError(`Invalid quantity: ${quantity}`, 400));
  }

  let cart = await Cart.findOne({ userID: req.user.id });
  if (!cart) {
    cart = new Cart({
      userID: req.user.id,
      products: [{ productID, quantity }],
    });
  } else {
    const productIndex = cart.products.findIndex(
      (prod) => prod.productID.toString() === productID
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ productID, quantity });
    }
  }

  await cart.save();
  res.status(200).json({ message: "Product added to cart" });
};

const removeFromCart = async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userID: req.user.id, "products.productID": req.body.productID },
    { $pull: { products: { productID: req.body.productID } } },
    { new: true }
  );
  if (cart) {
    res.status(200).json({ message: "item removed", cart: cart.products || [] });
  } else {
    res.status(404).json({ message: "Product not found in the cart" });
  }
};

export { getUserCart, updateUserCart, removeFromCart };
