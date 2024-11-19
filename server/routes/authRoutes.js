import express from 'express'
import { loginUser, userRegister } from '../controllers/userController'

const router = express.Router()
router.post("/register",userRegister)

router.post("/login",loginUser)

export default router;