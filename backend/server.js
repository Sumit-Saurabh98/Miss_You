import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js"

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, ()=>{
    connectToMongoDB()
    console.log(`server running on port ${PORT}`);
})

