import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from './config/connectDB.js'
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// import manageError from "./middlewares/manageError.js";
import connectCloudinary from "./config/cloudinary.js";
import cookieParser from "cookie-parser";
import { scopeoConfig } from "./config/scopeoConfig.js";
import initializeScopeo, { scopeoErrorHandler, scopeoRequestLogger } from "scopeo";
const app = express();

dotenv.config();
scopeoConfig()

connectDB();
connectCloudinary();

const PORT = process.env.PORT || 3005;
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials: true
}));

//scopeo initializer
initializeScopeo(app)

app.use(express.json());
app.use(cookieParser());
//scopeo logger
app.use(scopeoRequestLogger);


app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin",adminRoutes);


app.all("*",(req,res)=>{
  res.status(400).json({message:'cannot access the endpoint'})
})

//scopeo global errorHandler
scopeoErrorHandler(app)

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
