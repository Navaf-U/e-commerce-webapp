import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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

export {userRegister}