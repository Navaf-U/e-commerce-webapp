import express from 'express'
import tryCatch from '../utils/tryCatch.js'
import {allProducts,getProductById,getProductCategory} from '../controllers/user/productController.js'
import { getUserCart, removeFromCart, updateUserCart } from "../controllers/user/cartController.js"
import { tokenVerify } from '../middlewares/tokenVerify.js'

const router = express.Router()

router
// cart routes
.get("/cart",tokenVerify,tryCatch(getUserCart))
.post("/cart",tokenVerify,tryCatch(updateUserCart))
.delete("/cart",tokenVerify,tryCatch(removeFromCart))
// product routes
.get("/products",tryCatch(allProducts))
.get("/product/:id",tryCatch(getProductById))
.get("/products/:type",tryCatch(getProductCategory))


export default router