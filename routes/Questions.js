import express from 'express'
import { AskQuestion, getAllQuestions,deleteQuestion, voteQuestion } from '../controllers/Questions.js'
import auth from '../middleware/auth.js'

const router= express.Router()

router.post('/Ask', auth, AskQuestion)
router.get('/get', getAllQuestions)
router.delete('/delete/:id',deleteQuestion)
router.patch('/vote/:id', voteQuestion);

export default router