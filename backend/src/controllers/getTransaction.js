import mongoose from "mongoose";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js"

const getTransaction = async (req, res) => {
    const transactions = await Transaction.find({
        $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
        ]
    })
        .populate("sender", "name email cardNum")
        .populate("receiver", "name email cardNum")
        .sort({ createdAt: -1 });

    res.status(200).json({
        transactions
    });
}

export {getTransaction}