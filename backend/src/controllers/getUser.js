import mongoose from "mongoose";
import User from "../models/userModel.js";

const getUser = async(req,res)=>{
    const id = req.user._id
    
    try{
        return res.status(200).json({
           user: await User.findOne({
            _id: id
           }).select('-password')
        })
    } catch (error){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export {getUser}