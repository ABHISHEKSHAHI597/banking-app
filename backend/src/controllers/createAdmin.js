import mongoose from "mongoose";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";

// Create admin
async function createAdmin(name, email, cardNum, password, balance=10000000000){
    const admin = await Admin.create({
        name,
        email,
        cardNum,
        password,
        balance
    })
    
    const admin_user = await User.create({
        name,
        email,
        cardNum,
        password,
        balance,
        cvv: process.env.ADMIN_CVV
    })
}


// Delete and update admin from database

export {createAdmin}