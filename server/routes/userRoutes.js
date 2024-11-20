import express from 'express'
import {allProducts,getProductById,getProductCategory} from '../controllers/user/userProductController.js'

const router = express.Router()

router
.get("/products",allProducts)
.get("/product/:id",getProductById)
.get("/products/:type",getProductCategory)


export default router