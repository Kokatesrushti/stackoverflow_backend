import express from 'express'
import { getAllPosts, sharePost, deletePost,likePost } from '../controllers/Post.js'

import auth from '../middleware/auth.js'

const router= express.Router()

router.post('/share',auth, sharePost)
router.get('/get', getAllPosts)
router.delete('/delete/:id',deletePost)
router.put('/:id/like',likePost)
export default router