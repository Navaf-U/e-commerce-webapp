import Cart from "../../models/cartSchema.js";
import Order from "../../models/ordersSchema.js";
import Stripe from "stripe";
import Product from "../../models/productsSchema.js";
import CustomError from "../../utils/customError.js";

//cash on delivery order
const orderCashOnDelivery = async (req, res, next) => {
  // populating the order, if might order deletion by admin
  const newOrder = await new Order({
    ...req.body,
    userID: req.user.id,
  }).populate("products.productID", "name price image");

  if (!newOrder) return next(new CustomError("order not created", 400));

  const unavailableProduct = await Product.find({
    _id:{$in:newOrder.products.map((prod) => prod.productID)},
    isDeleted:true
  })


  if (unavailableProduct) {
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
  await currUserCart.save();
  await newOrder.save();

  res.status(201).json({ message: "Order placed successfully" });
};

// to make an order with stripe
const orderWithStripe = async (req, res, next) => {
  const { products, address, totalAmount } = req.body;
  if (!products || !address || !totalAmount){
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
    success_url: `http://localhost:3000/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/cancel`,
  });
  const newOrder = await new Order({
    userID: req.user.id,
    products,
    address,
    totalAmount: newTotal,
    paymentStatus: "Pending",
    shippingStatus: "Processing",
    paymentMethod: "Stripe",
    sessionID: session.id,
  });

  await newOrder.save();

  res
    .status(201)
    .json({
      message: "Order placed successfully",
      sessionID: session.id,
      stripeUrl: session.url,
    });
};

const StripeSuccess = async (req, res , next) => {
  const sessionID = req.params.sessionID;
  //finding the order using sessionID
  const order = await Order.findOne({sessionID : sessionID});
  if(!order) return next(new CustomError("Order not found", 404));
  // updating the order status
  order.paymentStatus = "Paid";
  order.shippingStatus = "Pending";
  await order.save();

  // will make cart empty after purchase
  await Cart.findOneAndUpdate(
    { userID: req.user.id },
    { $set: { products: [] } }
  ) 
  res.status(200).json({message:"Payment successful! Cart has been cleared"});
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
  if (cancelOrder.paymentStatus === "Paid"){
    return next(new CustomError("Payment already done", 400));
  }
  cancelOrder.shippingStatus = "Cancelled";
  cancelOrder.paymentStatus = "Cancelled";
  res.status(200).json({ message: "Order Cancelled" });
};

const publicKeySend = async (req,res)=>{res.status(200).json({publicKey:process.env.STRIPE_PUBLIC_KEY})}

export { orderCashOnDelivery, getAllOrders, getOneOrder, cancelOneOrder , orderWithStripe , StripeSuccess , publicKeySend};
