import  mongoose from "mongoose";


const cartSchema = mongoose.Schema({
    user :{type:mongoose.Schema.ObjectId, ref:"User" , required:true},
    products:[{
        productId:{type:Number , ref:"Product" , required:true , min:1 }
    }]
})

export default cartSchema; 