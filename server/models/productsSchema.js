import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{type:String , required:true},
        type:{type:String,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        qty:{type:Number,required:true},
        description:{type:String},
        brand:{type:String,required:true},
        rating:{type:Number,required:true,min:0,max:5},
        reviews:{type:Number},
        isDeleted:{type:Boolean, default:false }
    },
    {timestamps:true}
)

const productModel = mongoose.models.Product || mongoose.model("Product",productSchema)

export default productModel