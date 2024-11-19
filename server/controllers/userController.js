import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/usersSchema.js'

// createToken
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_TOKEN)
}

const userRegister = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        // emailChecking
        const exists = await User.findOne({email})
        if(exists){
            res.status(400).send("user exists")
        }
        // password Hashing + salt
        const hashedPassword = await bcrypt.hash(password,10) 
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()
        
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send("user doesn't exist")
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).send('invalid credintails')
        }
        const token = createToken(user._id)
        res.json({success:true,token,user})
    } catch (error) {
        console.log(error)
        res.json({error:error.message})
    }
}

export {userRegister,loginUser}