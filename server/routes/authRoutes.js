import express from 'express'
import tryCatch from '../utils/tryCatch.js'
import { loginUser, logout, refreshingToken, userRegister } from '../controllers/authController.js'

// route for user, the path starts with /api/user/
const router = express.Router()

router
.post("/register",tryCatch(userRegister))
.post("/login",tryCatch(loginUser))
.post("/refreshToken",tryCatch(refreshingToken)) //handling token refresh
.post("/logout",tryCatch(logout)) // handling logout

export default router;