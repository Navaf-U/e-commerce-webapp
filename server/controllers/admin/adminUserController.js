import mongoose from 'mongoose'
import User from '../../models/usersSchema.js'
import CustomError from '../../utils/customError.js'

const getAllUsers = async (req,res)=>{
    const users = await User.find({},{ password : 0 }).sort({createdAt : -1 })
    if(users){
        return res.status(200).json({users})
    }else{
        return res.status(200).json({users:[]})
    }
}

const getOneUser = async (req,res,next)=>{
    //checking id format valid or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new CustomError("Invalid ID format", 400)); 
    }
    const user = await User.findById(req.params.id,{ password : 0 })
    if(!user){
        return next(new CustomError("User not found",404))
    }
    res.status(200).json({user})
}

const blockUser = async (req,res) => {
    //checking id format valid or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new CustomError("Invalid ID format", 400)); 
    }
    const user = await User.findById(req.params.id,{password:0})
    if(!user){
        return next(new CustomError("User not found",404))
    }
    // will toggle the user block property true/false
    user.isBlocked = true
    await user.save()
    res.status(200).json({message:"User blocked successfully",user})
}
const unblockUser = async (req,res) => {
    //checking id format valid or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new CustomError("Invalid ID format", 400)); 
    }
    const user = await User.findById(req.params.id,{password:0})
    if(!user){
        return next(new CustomError("User not found",404))
    }
    // will toggle the user block property true/false
    user.isBlocked = false
    await user.save()
    res.status(200).json({message:"User unblocked successfully",user})
}



export {getAllUsers,getOneUser,blockUser,unblockUser}