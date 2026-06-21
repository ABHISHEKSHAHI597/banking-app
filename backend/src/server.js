import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { createAdmin } from "./controllers/createAdmin.js"
import { loginController } from "./controllers/loginController.js"
import cors from "cors"
import { registerController } from "./controllers/registerController.js"

dotenv.config()

// createAdmin("Abhishek Shahi","adminabhishek@gmail.com","111111111111", "admin@123")

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

// app.get('/users', userRoutes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`.cyan.underline.bold);
});