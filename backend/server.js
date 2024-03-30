import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());


app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    connectToMongoDB()
    console.log(`server running on port ${PORT}`);
})

