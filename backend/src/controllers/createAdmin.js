import mongoose from "mongoose";
import Admin from "../models/adminModel.js";

// Create admin
async function createAdmin(name, email, cardNum, password, balance=10000000000){
    const admin = await Admin.create({
        name,
        email,
        cardNum,
        password,
        balance
    })

    console.log(admin);
}


// Delete and update admin from database

export {createAdmin}