import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs"
import colors from "colors"

const loginController = asyncHandler(async (req, res) => {

    const { email, password, loginType } = req.body

    // For user login
    if (loginType === 'user') {
        const user = await User.findOne({ email })
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                console.log(`${user.name} logged in`.cyan.underline.bold)
                return res.status(200).json({
                    message: "Login successfull"
                })
            }
            else {
                return res.status(401).json({
                    message: "Invalid password"
                })
            }
        }
    }

    // For admin login
    else {
        const user = await Admin.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                console.log(`${user.name} logged in`.cyan.underline.bold)
                return res.status(200).json({
                    message: "Login successfull"
                })
            }
            else {
                return res.status(401).json({
                    message: "Invalid password"
                })
            }
        }

    }
})

export { loginController }