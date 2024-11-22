import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import ConnectDB from './config/connectDB.js'
import connectCloudinary from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// middleware
app.use(express.json());
// api endpoints
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("BACKEND running");
});
//mongoDb connect
ConnectDB();
// cloudinaryConnects
connectCloudinary();

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
