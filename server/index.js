import express from "express";
import dotenv from "dotenv";
import connectDB from './config/connectDB.js'
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import manageError from "./middlewares/manageError.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//mongoDb connect AND cloudinaryConnects
connectDB();
connectCloudinary();

// middleware
app.use(express.json());

// api endpoints
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// undefined endpoint will handle
app.all("*",(req,res)=>{
  res.status(400).json({message:'cannot access the endpoint'})
})

app.get("/", (req, res) => {
  res.send("BACKEND running");
});

app.use(manageError)

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
