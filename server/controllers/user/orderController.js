import Cart from "../../models/cartSchema.js";
import Order from "../../models/ordersSchema.js";
import Stripe from "stripe";
import Product from "../../models/productsSchema.js";
import mongoose from "mongoose";
import CustomError from "../../utils/customError.js";

const orderCashOnDelivery = async (req, res, next) => {
  const newOrder = await new Order({
    ...req.body,
    userID: req.user.id,
  }).populate("products.productID", "name price image");

  if (!newOrder) return next(new CustomError("order not created", 400));

  newOrder.paymentStatus = "Pending";
  newOrder.shippingStatus = "Processing";

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
  order.paymentStatus = "Paid";
  order.shippingStatus = "Processing";
  await order.save();

  await Cart.findOneAndUpdate(
    { userID: req.user.id },
    { $set: { products: [] } }
  );
  res
    .status(200)
    .json({ message: "Payment successful! Cart has been cleared" });
};

const getAllOrders = async (req, res) => {
  const newOrders = await Order.find({ userID: req.user.id })
    .populate("products.productID", "name price image")
    .sort({ createdAt: -1 });

  if (newOrders) {
    res.status(200).json({ data: newOrders });
  } else {
    res.status(200).json({ data: [] });
  }
};

//
const getOneOrder = async (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.orderID)) {
    return next(new CustomError("Invalid order ID", 400));
  }
  const singleOrder = await Order.findOne({

    _id: req.params.orderID,
    userID: req.user.id,
  }).populate("products.productID", "name image price");

  if (!singleOrder) {
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ singleOrder });
};


const cancelOneOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderID,
      userID: req.user.id,
    });

    if (!order) {
      return next(new CustomError("Order not found", 404));
    }


    if (order.paymentStatus === "Paid") {
      return next(
        new CustomError("Order cannot be canceled as it is already paid.", 400)
      );
    }
    if (order.shippingStatus === "Cancelled") {
      return next(new CustomError("Order is already canceled.", 400));
    }

    order.shippingStatus = "Cancelled";
    order.paymentStatus = "Cancelled";
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
