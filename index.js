import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import postRoutes from './routes/Post.js'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import cloudinary from 'cloudinary'
const app = express();
dotenv.config();

cloudinary.v2.config({
  cloud_name: "dbxdj3qmt",
  api_key: "447428474848984",
  api_secret: "kQGPsH5Kzb-UO3ko9JlJHLU02FE"
});
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb",extended: true}))
app.use(cors())

app.get('/', (req, res) =>{

    res.send("This is stackoverflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer',answerRoutes)
app.use('/post',postRoutes)

const PORT = process.env.PORT || 5000

const DATABASE_URL= process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, {useNewUrlParser : true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
.catch((err) => console.log(err.message))

app.get("/questions/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);




