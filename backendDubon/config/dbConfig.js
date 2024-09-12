// config/dbConfig.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
  try {
    const conn =  mongoose
    .connect(process.env.MONGODB_URI, {
    })
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.status(201).json({error})
  }
};

export default  dbConnect ;
