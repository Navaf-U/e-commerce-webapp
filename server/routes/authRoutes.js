import express from 'express'
import { loginUser, userRegister } from '../controllers/authController.js'
import tryCatch from '../utils/tryCatch.js'

// route for user, the path starts with /api/user/
const router = express.Router()
router.post("/register",tryCatch(userRegister))
router.post("/login",tryCatch(loginUser))

export default router;