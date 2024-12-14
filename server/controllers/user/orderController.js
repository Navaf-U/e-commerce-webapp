import Cart from "../../models/cartSchema.js";
import Order from "../../models/ordersSchema.js";
import Stripe from "stripe";
import Product from "../../models/productsSchema.js";
import mongoose from "mongoose";
import CustomError from "../../utils/customError.js";

//cash on delivery order
const orderCashOnDelivery = async (req, res, next) => {
  // populating the order, if might order deletion by admin
  const newOrder = await new Order({
    ...req.body,
    userID: req.user.id,
  }).populate("products.productID", "name price image");

  if (!newOrder) return next(new CustomError("order not created", 400));

  // getting the status for payment and delivery
  newOrder.paymentStatus = "Pending";
  newOrder.shippingStatus = "Processing";

  // will make cart empty after purchase
  let currUserCart = await Cart.findOneAndUpdate(
    { userID: req.user.id },
    { $set: { products: [] } }
  );
  await currUserCart.save();
  await newOrder.save();

  res.status(201).json({ message: "Order placed successfully" });
};

// to make an order with stripe
const orderWithStripe = async (req, res, next) => {
  const { products, address, totalAmount, firstName, lastName, email, mobile } =
    req.body;
  if (
    !products ||
    !address ||
    !totalAmount ||
    !firstName ||
    !lastName ||
    !email ||
    !mobile
  ) {
    return next(new CustomError("All fields are required", 400));
  }
  // getting the details of the product
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.productID);
      return {
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      };
    })
  );
  const newTotal = Math.round(totalAmount);
  // creating the stripe line items
  const lineItems = productDetails.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  // creating the stripe session
  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/cancel`,
  });
  const newOrder = await new Order({
    userID: req.user.id,
    products,
    address,
    firstName,
    lastName,
    email,
    mobile,
    totalAmount: newTotal,
    paymentStatus: "Pending",
    shippingStatus: "Processing",
    paymentMethod: "Stripe",
    sessionID: session.id,
  });

  await newOrder.save();

  res.status(201).json({
    message: "Order placed successfully",
    sessionID: session.id,
    stripeUrl: session.url,
  });
};

const StripeSuccess = async (req, res, next) => {
  const sessionID = req.params.sessionID;
  //finding the order using sessionID
  const order = await Order.findOne({ sessionID: sessionID });
  if (!order) return next(new CustomError("Order not found", 404));
  // updating the order status
  order.paymentStatus = "Paid";
  order.shippingStatus = "Processing";
  await order.save();

  // will make cart empty after purchase
  await Cart.findOneAndUpdate(
    { userID: req.user.id },
    { $set: { products: [] } }
  );
  res
    .status(200)
    .json({ message: "Payment successful! Cart has been cleared" });
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
  // will validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.params.orderID)) {
    return next(new CustomError("Invalid order ID", 400));
  }
  const singleOrder = await Order.findOne({
    // get order by params
    _id: req.params.orderID,
    userID: req.user.id,
  }).populate("products.productID", "name image price");

  if (!singleOrder) {
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ singleOrder });
};

// to cancel the order
const cancelOneOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderID,
      userID: req.user.id,
    });

    if (!order) {
      return next(new CustomError("Order not found", 404));
    }

    // will get an error on cancellation if the order is already paid
    if (order.paymentStatus === "Paid") {
      return next(
        new CustomError("Order cannot be canceled as it is already paid.", 400)
      );
    }
    if (order.shippingStatus === "Cancelled") {
      return next(new CustomError("Order is already canceled.", 400));
    }
    // will update order shipping status to "Cancelled"
    order.shippingStatus = "Cancelled";
    await order.save();
    await order.populate("products.productID", "name price image")

    res.status(200).json({
      success: true,
      message: "Order canceled successfully.",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const publicKeySend = async (req, res) => {
  res.status(200).json({ stripePublicKey: process.env.STRIPE_PUBLIC_KEY });
};

export {
  orderCashOnDelivery,
  getAllOrders,
  getOneOrder,
  cancelOneOrder,
  orderWithStripe,
  StripeSuccess,
  publicKeySend,
};
