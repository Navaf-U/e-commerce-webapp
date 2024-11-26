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
    const user = await User.findById(req.params.id)
    if(!user){
        return next(CustomError("User not found",404))
    }
    res.status(200).json({user})
}

const blockUser = async (req,res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        return next(CustomError("User not found",404))
    }
    // will toggle the user block property true/false
    user.isBlocked = !user.isBlocked
    await user.save()
    res.status(200).json({user})
}



export {getAllUsers,getOneUser,blockUser}