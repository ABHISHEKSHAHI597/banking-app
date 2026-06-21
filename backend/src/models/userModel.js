import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    cardNum: {
        type: String,
        required: true,
        unique: true
    },
    cvv: {
        type: String,
        required: true,
        unique: false
    },
    balance: {
        type: Number,
        default: 10000
    }
},{
    timestamps: true,
})

export default mongoose.model('User',userSchema)