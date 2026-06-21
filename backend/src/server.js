import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`.cyan.underline.bold);
});