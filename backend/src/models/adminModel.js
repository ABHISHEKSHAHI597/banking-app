import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cardNum: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 10000000000
    }
})

export default mongoose.model("Admin",adminSchema)