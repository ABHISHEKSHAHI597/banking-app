import mongoose from "mongoose";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

const userPayment = async (req, res) => {

    try {
        const user = req.user

        const senderCard = req.body.senderCardNumber
        const receiverCard = req.body.receiverCardNumber
        const cvv = req.body.cvv
        const amount = Number(req.body.amount)

        const receiver = await User.findOne({
            cardNum: receiverCard
        })

        if (!receiver) {
            return res.status(404).json({
                message: "Receiver not found"
            })
        }

        const sender = await User.findOne({
            cardNum: senderCard
        })


        if (!sender) {
            return res.status(400).json({
                message: "Invalid card number"
            })
        }

        if (user.cardNum !== senderCard) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        if (amount > sender.balance) {
            return res.status(422).json({
                message: "Insufficient balance"
            })
        }

        if (senderCard === receiverCard) {
            return res.status(400).json({
                message: "Cannot transfer money to the same account"
            })
        }

        const updatedSender = await User.findByIdAndUpdate(
            sender._id,
            {
                $inc: { balance: -amount }
            },
            {
                new: true
            }
        )

        const updatedReceiver = await User.findByIdAndUpdate(
            receiver._id,
            {
                $inc: { balance: amount }
            },
            {
                new: true
            }
        )

        const payment = await Transaction.create({
            sender: sender._id,
            receiver: receiver._id,
            amount
        })

        return res.status(200).json({
            message: "Payment Successfull"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }

}

export { userPayment }