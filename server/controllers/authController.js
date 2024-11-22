import jwt from 'jsonwebtoken'
import User from '../models/usersSchema.js'
import bcrypt from 'bcrypt'
import CustomError from '../utils/customError.js'

// createToken
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_TOKEN);
}

const userRegister = async (req,res)=>{
        const {name,email,password} = req.body
        // emailChecking
        const exists = await User.findOne({email})
        if(exists){
           return res.status(400).send("user exists")
        }
        // password Hashing + salt
        const hashedPassword = await bcrypt.hash(password,10) 
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })

        // creating token and adding user to db
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
}


const loginUser = async(req,res,next)=>{
        const {email , password} = req.body;
        const user = await User.findOne({email})
        
        if(!user){
            return next(new CustomError("User doesn't exist",401))
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return next(new CustomError("Incorrect password",401)) 
        }
        const userDetails = {
            name:user.name,
            email:user.email
        }
        // creating token for logged user
        const token = createToken(user._id)
        res.json({success:true,token})
}


export {userRegister,loginUser}