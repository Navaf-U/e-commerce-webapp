import Cart from "../../models/cartSchema.js";

// to get the userCart
const getUserCart = async (req, res) => {
  const data = await Cart.findOne({ userID: req.user.id }).populate({
    path: "products.productID",
    // to specify which fields to populate
    select: "name price image",
  });
  if (data) {
    res.status(200).json(data);
  } else {
    // if no cart,will return empty array
    res.status(200).json({ products: [] });
  }
};

const updateUserCart = async (req, res, next) => {
  const { productID, quantity } = req.body;
  if (quantity < 1) {
    //if quantity is lesser than 1 ,will send error
    next(new CustomError(`Invalid quantity: ${quantity}`, 400));
  }

  let cart = await Cart.findOne({ userID: req.user.id });
  // if user does not have cart,will create one
  if (!cart) {
    cart = new Cart({
      userID: req.user.id,
      products: [{ productID, quantity }],
    });
  } else {
    // checking if the products already in the cart
    const productIndex = cart.products.findIndex(
      (prod) => prod.productID.toString() === productID
    );
    if (productIndex > -1) {
      // if the product already there update the quantity
      cart.products[productIndex].quantity = quantity;
    } else {
      // if the prod not exists, will push
      cart.products.push({ productID, quantity });
    }
  }

  await cart.save();
  res.status(200).json({message:"cart updated"});
};

const removeFromCart = async (req, res) => {
  //finding the cart of the user with user id and remove the product
  const cart = await Cart.findOneAndUpdate(
    { userID: req.user.id, "products.productID": req.body.productID },
    { $pull: { products: { productID: req.body.productID } } },
    { new: true }
  );
  if (cart) {
    res.status(200).json({message:"item removed"});
  } else {
    res.status(404).json({ message: "Product not found in the cart" });
  }
};

export { getUserCart, updateUserCart, removeFromCart };
