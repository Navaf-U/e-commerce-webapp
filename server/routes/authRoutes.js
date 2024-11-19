import express from 'express'
import { userRegister } from '../controllers/userController'
const router = express.Router()

router.post("/register",userRegister)

router.post("/login",(req,res)=>{
    res.send("from LOGIN")
})

export default router;