import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const registerController = asyncHandler(async(req,res)=>{
    const {name, email, password, cvv} = req.body
    try{
        const user = await User.findOne({email})

        if(user){
            return res.status(409).json({
                message: "User already exists"
            })
        }
        else{
            // Generating a unique 12 digit card num for each user
            let cardNum

            while(true){
                cardNum = Math.floor(100000000000 + Math.random()*900000000000).toString()
                let exists = await User.findOne({cardNum})
                if(!exists){
                    break;
                }
            }
            const pass = await bcrypt.hash(password,10)
            const CVV = await bcrypt.hash(cvv,10)
            const user = await User.create({
                name,
                email,
                password : pass,
                cardNum,
                cvv : CVV,
            })

            console.log(`${user.name} registered`);
            return res.status(201).json({
                message: "Successfully registered"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

export { registerController }