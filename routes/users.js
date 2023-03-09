import express from 'express'
import {login, signup } from '../controllers/auth.js'
import { addFriend, getAllUsers,  updateProfile,removeFriend } from '../controllers/users.js'
import auth from '../middleware/auth.js'
import {verifyotp,sendotp} from '../controllers/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/sendotp',sendotp)
router.post('/verifyotp',verifyotp)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)
router.post('/add/:id',addFriend)
router.delete('/remove/:id',auth,removeFriend)
export default router