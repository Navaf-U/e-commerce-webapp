import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import connectCloudinary from './config/cloudinary.js'

const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()

// middleware
app.use(express.json())
// api endpoints
app.use('/user',authRoutes)

app.get("/",(req,res)=>{
    res.send("BACKEND running")
})
//mongoDb connect 
const ConnectDB = async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("DB CONNECTED")
})
    
    await mongoose.connect(`${process.env.HOST}`)
}

ConnectDB()
// cloudinaryConnects
connectCloudinary()

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})