import User from '../Model/Usermodel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


export const signup = async (req,res)=>{
    const {name,email,password,role} = req.body;
    if(!name || !email || !password || !role){
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the required fields'
        });
    }
    // Generate JWT Token
    const token = jwt.sign(
        { id: User._id },  // Store user ID in token
        process.env.JWT_SECRET, 
        { expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN}
    );

    const refresh_token = jwt.sign(
        {id: User._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}  
    );
    
    try{
        const user = await User.create({
            name,
            email,
            password,
            role,
            refresh_token
        });
       // Send token in response
       res.cookie('refresh_token',refresh_token,{
           httpOnly: true});
    res.status(201).json({
        status: "success",
        token,   // Include token in response
        data: {
            user,
        },
    });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            status: "fail", 
            message: "Please provide both email and password" 
        });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        );

        res.status(200).json({
            status: "success",
            token,
            name: user.name,
            email: user.email,
            role: user.role,
            score: user.score,
        });

    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Server error"
        });
    }
};
export const getUser = async (req, res) => {
    try {
        const token = req.body; // Ensure `id` is extracted properly
        if (!token) {
            return res.status(400).json({ message: "No ID provided" });
        }

        const user = await User.findOne({ _id: token.id }); // Ensure `_id` is used for MongoDB queries
        if (!user) {
            return res.status(404).json({ message: "No User found" });
        }
        res.status(200).json({
            status: "success",
            name: user.name,
            email: user.email,
            role: user.role,
            score:user.Score
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};