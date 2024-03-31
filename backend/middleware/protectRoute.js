import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({error: "Unauthorised, No token provided"})
        }

        const decoaded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoaded){
            return res.status(401).json({error: "Unauthorised, No token provided"})
        }

        const user = await User.findById(decoaded.userId).select("-password");

        if(!user) {
            return res.status(404).json({error: "user not found"})
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protected middleware", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export default  protectRoute;