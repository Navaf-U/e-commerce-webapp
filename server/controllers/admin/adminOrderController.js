import mongoose from "mongoose";
import Orders from "../../models/ordersSchema.js";
import CustomError from "../../utils/customError.js";

const getTotalOrders = async (req, res) => {
  const totalOrders = await Orders.find()
    .populate("products.productID", "name price image")
    .sort({ createdAt: -1 });
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: totalOrders });
};

const getOrderByUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const orders = await Orders.find({ userID: req.params.id })
    .populate("products.productID", "name price image")
    .sort({ createdAt: -1 });
  if (!orders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: orders });
};

const getSingleOrderByUser = async (req, res, next) => {
  const { orderID, userID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderID) || !mongoose.Types.ObjectId.isValid(userID)) {
    return next(new CustomError("Invalid ID format", 400));
  }

  try {
    const order = await Orders.findOne({ _id: orderID, userID })
      .populate("products.productID", "name price image");

    if (!order) {
      return next(new CustomError("Order not found", 404));
    }

    res.status(200).json({ data: order });
  } catch (err) {
    return next(new CustomError("Order not found", 404));
  }
};

const totalPurchaseOfOrders = async (req, res) => {
  const confirmedOrders = await Orders.aggregate([
    { $match: { shippingStatus: { $ne: "Cancelled" } } },
    { $count: "confirmedOrders" },
  ]);
  if (confirmedOrders.length === 0) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: confirmedOrders[0].confirmedOrders });
};

const updateShippingStatus = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const order = await Orders.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { shippingStatus: req.body.status } },
    { new: true }
  );
  if (!order) {
    return next(new CustomError("Order not found", 400));
  }
  res
    .status(200)
    .json({ message: "Order shipping status updated successfully" });
};

const updatePaymentStatus = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const order = await Orders.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { paymentStatus: req.body.status } },
    { new: true }
  );
  if (!order) {
    return next(new CustomError("Order not found", 400));
  }
  res
    .status(200)
    .json({ message: "Order payment status updated successfully" });
};

const getTotalStats = async (req, res) => {
  const totalStats = await Orders.aggregate([
    { $match: { shippingStatus: { $ne: "Cancelled" }, paymentStatus: "Paid" } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
        totalProductsSold: { $sum: 1 },
      },
    },
  ]);
  if (totalStats.length === 0) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({
    data: {
      totalRevenue: totalStats[0].totalRevenue,
      totalOrders: totalStats[0].totalOrders,
      totalProductsSold: totalStats[0].totalProductsSold,
    },
  });
};

export {
  getTotalOrders,
  totalPurchaseOfOrders,
  updateShippingStatus,
  updatePaymentStatus,
  getOrderByUser,
  getSingleOrderByUser,
  getTotalStats,
};
