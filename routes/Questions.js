import express from 'express'
import { AskQuestion, getAllQuestions,deleteQuestion, voteQuestion } from '../controllers/Questions.js'
import { checkout, paymentVerification} from '../controllers/paymentController.js'
import auth from '../middleware/auth.js'

const router= express.Router()

router.post('/Ask', auth, AskQuestion)
router.get('/get', getAllQuestions)
router.delete('/delete/:id',deleteQuestion)
router.patch('/vote/:id', voteQuestion);
router.post("/checkout",checkout);

router.post("/paymentverification",paymentVerification);
export default router