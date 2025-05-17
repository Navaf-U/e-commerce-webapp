import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userID:{ type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true } ,
        products:[
        {
            productID:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{type:Number,required:true,default:1}
        }
    ],
    sessionID:{type:String},
    purchasedDate:{type:Date,default:Date.now},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    address:{type:Object,required:true},
    totalAmount:{type:Number , required:true},
    paymentStatus:{type:String,default:"pending"},
    shippingStatus:{type:String,default:"pending"},
    },
    {timestamps:true}
    
)

const orderModel = mongoose.models.Order || mongoose.model("Order",orderSchema)

export default orderModel