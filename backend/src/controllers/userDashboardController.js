import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import Transaction from "../models/transactionModel.js"
import colors from "colors"

const userDashboardController = asyncHandler(async(req,res)=>{
    const user = req.user
    const id = user._id.toString()
    
    const debits = await Transaction.find({sender: id})
    const credits = await Transaction.find({reciever: id})
    
    let credit = 0
    let debit = 0

    debits.forEach((item)=>{
        debit += item.amount
    })

    credits.forEach((item)=>{
        credit += item.amount
    })

    console.log(`${user.name} visited dashboard`);

    res.status(200).json({
        name: user.name,
        credit,
        debit,
        balance: user.balance
    })

})

export {userDashboardController}