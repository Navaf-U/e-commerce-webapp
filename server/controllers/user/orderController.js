import Cart from "../../models/cartSchema.js";
import Order from "../../models/ordersSchema.js";
import CustomError from "../../utils/customError.js";

//cash on delivery order
const orderCashOnDelivery = async (req, res, next) => {
  // populating the order, if might order deletion by admin
  const newOrder = await new Order({
    ...req.body,
    userID: req.user.id,
  }).populate("products.productID", "name price image");

  if (!newOrder) return next(new CustomError("order not created", 400));

  // will check if any product got deleted by admin
  const checkUnavailableProduct = newOrder.products.some(
    (p) => !p.productID || !p.productID.name
  );
  if (checkUnavailableProduct) {
    return next(new CustomError("some product not available", 400));
  }

  // getting the status for payment and delivery
  newOrder.paymentStatus = "Cash On Delivery";
  newOrder.shippingStatus = "Processing";

  // will make cart empty after purchase
  let currUserCart = await Cart.findOneAndUpdate(
    { userID: req.user.id },
    { $set: { products: [] } }
  );
  let cart = await currUserCart.save();
  let order = await (
    await newOrder.save()
  ).populate("products.productID", "name price image");

  res.status(201).json({ data: order, cart: cart });
};

// to get all orders by user

const getAllOrders = async (req, res) => {
  const newOrders = await Order.find({ userID: req.user.id })
    .populate("products.productID", "name price image")
    .sort({ createdAt: -1 });

  // will send orders or an empty array if none found
  if (newOrders) {
    res.status(200).json({ data: newOrders });
  } else {
    res.status(200).json({ data: [] });
  }
};

// to get single order
const getOneOrder = async (req, res, next) => {
  const singleOrder = await Order.findOne({
    // get order by params
    _id: req.params.orderID,
    userID: req.user.id,
  }).populate("products.productID", "name image price");

  if (!singleOrder) {
    return next(new CustomError("order not found", 404));
  }
  res.status(200).json({ singleOrder });
};


// to cancel the order
const cancelOneOrder = async (req, res, next) => {
  // getting the oneOrder and cancelling nd updating its status
  const cancelOrder = await Order.findOneAndUpdate(
    {
      _id: req.params.orderID,
      userID: req.user.id,
    },
    { $set: { shippingStatus: "Cancelled" } },
    { new: true }   
  );
  if (!cancelOrder) {
    return next(new CustomError("no order found", 404));
  }
  res.status(200).json({ message: "Order Cancelled" });
};

export {orderCashOnDelivery,getAllOrders,getOneOrder,cancelOneOrder}
