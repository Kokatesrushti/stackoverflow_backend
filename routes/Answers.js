import express from "express";
import { postAnswer, deleteAnswer } from '../controllers/Answers.js'
import auth from '../middleware/auth.js'

const router = express.Router()

//Use patch since we want to add the ans in the question which is already posted
router.patch('/post/:id', auth, postAnswer)
router.patch('/delete/:id',deleteAnswer)


export default router