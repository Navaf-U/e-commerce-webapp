import express from 'express'
import mongoose, { Mongoose } from 'mongoose'
import dotenv from 'dotenv'
const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()



// middleware
app.use(express.json())

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



app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})