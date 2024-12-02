import Orders from '../../models/ordersSchema.js'
import CustomError from '../../utils/customError.js';

// get all the total orders
const getTotalOrders = async (req,res)=>{
    const totalOrders = await Orders.find()
    .populate("products.productID","name price image")
    .sort({ createdAt : -1 })
    if(!totalOrders){
        return res.status(200).json({message:"No orders found"})
    }
    res.status(200).json({data:totalOrders});
}

// get all the order of user
const getOrderByUser = async (req,res)=>{
    const orders = await Orders.find({userID:req.params.id})
    .populate("products.productID","name price image")
    .sort({ createdAt : -1 })
     if(!orders){
        return res.status(200).json({message:"No orders found"})
     }
     res.status(200).json({ data : orders })
}
// get the total number of orders
const totalPurchaseOfOrders = async (req,res)=>{
    const totalOrders = await Orders.find()
    if(!totalOrders){
        return res.status(200).json({message:"No orders found"})
    }
    const confirmedOrders = totalOrders.filter(
        (order)=> order.shippingStatus !== "Cancelled"
    )
    res.status(200).json({data:confirmedOrders.length})
}

// will update the shipping status 
const updateShippingStatus = async (req,res,next)=>{
    const order = await Orders.findOneAndUpdate(
        {_id:req.params.id},
        {$set:{shippingStatus:req.body.status}},
        {new:true}
    )
    if(!order){
        return next(new CustomError("Order not found",400))
    }
    res.status(200).json({message:"Order shipping status updated successfully"})
}

// updating the payment status
const updatePaymentStatus = async (req,res,next)=>{
    const order = await Orders.findOneAndUpdate(
        {_id:req.params.id},
        {$set:{paymentStatus:req.body.status}},
        {new:true}
    )
    if(!order){
        return next(new CustomError("Order not found",400))
    }
    res.status(200).json({message:"Order payment status updated successfully"})
}

// getting the total revenue
const getTotalRevenue = async (req,res)=>{
    const totalOrders = await Orders.find()
    if(!totalOrders){
        return res.status(200).json({message:"No orders found"})
    }
    // will get revenue if order is not cancelled and is paid 
    const confirmedOrders = totalOrders.filter(
        (order)=> order.shippingStatus !== "Cancelled" && order.paymentStatus === "Paid" 
    )
    const revenue = confirmedOrders.reduce((acc,order)=>{
        return acc + order.totalAmount;
    },0);
    res.status(200).json({data:revenue})
}

export {getTotalOrders,totalPurchaseOfOrders,updateShippingStatus,updatePaymentStatus,getOrderByUser,getTotalRevenue}