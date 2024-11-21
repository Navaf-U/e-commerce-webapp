import Order from "../../models/ordersSchema.js";
import CustomError from '../../utils/customError.js'
import Cart from '../../models/cartSchema.js'

//cash on delivery order 
const orderCashOnDelivery = async (req,res,next)=>{
// populating the order to just might order deletion by admin
  const newOrder = await new Order({
    ...req.body,
    userID: req.user.id,
  }).populate("products.productId", "name price image");
  
  if(!newOrder) return next(new CustomError("order not created",400))

    // will check if any product got deleted by admin
    const checkAvailableProduct = newOrder.products.some(
        (p)=> !p.productID || !p.productID.name
    )
    if(checkAvailableProduct){
        return next(new CustomError("some product not available",400))
    }

    // getting the status for payment and delivery
    newOrder.paymentStatus = "Cash On Delivery"
    newOrder.shippingStatus =  "Processing"

    // will make cart empty after purchase
    let currCart = await Cart.findByIdAndUpdate(
        {userID:req.user.id},
        {$set:{products:[]}}
    )
    let cart = await currCart.save()
    let order = await (
        await newOrder.save()
    ).populate("products.productID","name price image")
    
    res.status(201).json({data:order , cart:cart})
}   

// to get all orders by user

// const getAll
