import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
dotenv.config();
const app=express();
app.use(cors({
    origin: 'https://gps-tracking-x6qv.onrender.com', 
    credentials: true, 
  }));
app.use(express.json());
app.use("/api",authRoutes);
app.listen(process.env.PORT || 8000,()=>{
    console.log("server running");
});