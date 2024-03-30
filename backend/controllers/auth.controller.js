import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndSrtCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"});
        }

        const user = await User.findOne({username})
        
        if(user){
            return res.status(400).json({error: "username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

       if(newUser){
        // Generate  JWT and add it to the response body 
        generateTokenAndSrtCookie(newUser._id, res)
         await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
       }else{
        res.status(400).json({error: "Invalid user data"})
       }

    } catch (error) {
        console.log("Error in Signup",error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username})
    } catch (error) {
        console.log("Error in Login controller",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const logout = (req, res) => {
    console.log("log out")
}

