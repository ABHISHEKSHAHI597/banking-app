import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const registerController = asyncHandler(async(req,res)=>{
    const {name, email, password, cvv} = req.body

    try{
        const user = User.findOne({email})

        if(!user){
            return res.status(409).json({
                message: "User already exists"
            })
        }
        else{

            // Generating a unique 12 digit card num for each user
            const cardNum = Math.floor(100000000000 + Math.random()*900000000000).toString()

            const user = await User.create({
                name,
                email,
                password,
                cvv
            })

            return res.status(201).json({
                message: "Successfully registered"
            })
        }
    } catch{
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

export { registerController }