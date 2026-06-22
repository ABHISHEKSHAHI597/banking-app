import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { loginController } from "./controllers/loginController.js"
import cors from "cors"
import { registerController } from "./controllers/registerController.js"
import { protect } from "./middlewares/authMiddleware.js"
import { userDashboardController } from "./controllers/userDashboardController.js"
import {userPayment} from "./controllers/userPaymentController.js"
import { getUser } from "./controllers/getUser.js"
import {getTransaction} from "./controllers/getTransaction.js"


dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.post("/login", loginController)
app.post("/register", registerController)
app.get("/userDashboard", protect, userDashboardController)
app.post('/userPayment', protect, userPayment)
app.get('/getUser', protect, getUser)
app.get('/userTransaction', protect, getTransaction)

app.listen(port, () => {
  console.log(`App is running on port ${port}`.cyan.underline.bold);
});