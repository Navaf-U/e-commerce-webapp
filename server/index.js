import express from "express";
import dotenv from "dotenv";
import connectDB from './config/connectDB.js'
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import manageError from "./middlewares/manageError.js";
import connectCloudinary from "./config/cloudinary.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//mongoDb connect AND cloudinaryConnects
connectDB();
connectCloudinary();

// middleware
app.use(express.json());

//base path, api endpoints
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin",adminRoutes)

// undefined endpoint will handle
app.all("*",(req,res)=>{
  res.status(400).json({message:'cannot access the endpoint'})
})

app.get("/", (req, res) => {
  res.send("BACKEND running");
});


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

app.use(manageError)
