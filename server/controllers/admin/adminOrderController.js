import Orders from "../../models/ordersSchema.js";
import CustomError from "../../utils/customError.js";

// get all the total orders
const getTotalOrders = async (req, res) => {
  const totalOrders = await Orders.find()
    .populate("products.productID", "name price image")
    .sort({ createdAt: -1 });
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: totalOrders });
};

// get all the order of user
const getOrderByUser = async (req, res) => {
  //checking id format valid or not
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
// get the total number of orders
const totalPurchaseOfOrders = async (req, res) => {
  const confirmedOrders = await Orders.aggregate([
    { $match: { shippingStatus: { $ne: "Cancelled" } } },
    { $count: "confirmedOrders" }, //will count matching orders
  ]);
  //if no orders aggregate will return empty array so..
  if (confirmedOrders.length === 0) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: confirmedOrders[0].confirmedOrders });
};

// will update the shipping status
const updateShippingStatus = async (req, res, next) => {
  //checking id format valid or not
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

// updating the payment status
const updatePaymentStatus = async (req, res, next) => {
  //checking id format valid or not
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

// getting the total revenue
const getTotalStats = async (req, res) => {
  const totalStats = await Orders.aggregate([
    { $match: { shippingStatus: { $ne: "Cancelled" }, paymentStatus: "Paid" } },
    { $unwind: "$products" }, // deconstruct the 'products' array
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" }, // sum of total amounts
        totalOrders: { $sum: 1 }, // count of orders
        totalProductsSold: { $sum: 1 }, // count of products sold
      },
    },
  ]);
  if (totalStats.length === 0){
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
  getTotalStats,
};
