import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{type:String , required:true},
        type:{type:String,required:true},
        image:{type:String},
        price:{type:Number,required:true},
        qty:{type:Number,required:true},
        description:{type:String},
        brand:{type:String,required:true},
        rating:{type:Number,min:1,max:5,default:1},
        reviews:{type:Number,default:0},
        isDeleted:{type:Boolean, default:false }
    },
    {timestamps:true}
)

const productModel = mongoose.models.Product || mongoose.model("Product",productSchema)

export default productModel