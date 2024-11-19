import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{type: String, required:true},
    email:{type:String,required:true,unique:true},
    cart:{type:mongoose.Types.ObjectId,ref:"cart"},
    orders:[{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    isAdmin:{type:Boolean,default:false},
    
},
{timesstamps:true}
);

export default mongoose.model("User",userSchema)