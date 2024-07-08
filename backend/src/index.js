import express from "express";
import dotenv from "dotenv";
import {app} from "./app.js"
import connectDB from "./db/index.js";
dotenv.config();
const port = process.env.PORT || 4000;

connectDB()
.then(()=>{
  app.on("error",(error)=>{
    console.log("error", error)
    throw error
    
  });
  app.listen(port, () => {
    console.log(`⚙️ Server is running at port : ${port}`);
  });
})
.catch((error)=>{
  console.log("MonogDB connection failed : ",error)
})
