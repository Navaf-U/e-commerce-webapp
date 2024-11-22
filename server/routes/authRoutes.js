import express from 'express'
import tryCatch from '../utils/tryCatch.js'
import { loginUser, userRegister } from '../controllers/authController.js'

// route for user, the path starts with /api/user/
const router = express.Router()
router.post("/register",tryCatch(userRegister))
router.post("/login",tryCatch(loginUser))

export default router;