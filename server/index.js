import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from './config/connectDB.js'
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import manageError from "./middlewares/manageError.js";
import connectCloudinary from "./config/cloudinary.js";


dotenv.config();
//mongoDb connect AND cloudinaryConnects
connectDB();
connectCloudinary();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials: true
}));


// middleware
app.use(express.json());
app.get("/", (req, res) => {
  res.send("BACKEND Running");
});


//base path, api endpoints
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin",adminRoutes);


// undefined endpoint will handle
app.all("*",(req,res)=>{
  res.status(400).json({message:'cannot access the endpoint'})
})


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
app.use(manageError)
