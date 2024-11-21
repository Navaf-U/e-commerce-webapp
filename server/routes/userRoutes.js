import express from 'express'
import tryCatch from '../utils/tryCatch.js'
import { tokenVerify } from '../middlewares/tokenVerify.js'
import {allProducts,getProductById,getProductCategory} from '../controllers/user/productController.js'
import { getUserCart, removeFromCart, updateUserCart } from "../controllers/user/cartController.js"
import { addToWishList, getUserWishList, removeFromWishList } from '../controllers/user/wishListController.js'

const router = express.Router()

router

// product routes
.get("/products",tryCatch(allProducts))
.get("/product/:id",tryCatch(getProductById))
.get("/products/:type",tryCatch(getProductCategory))

// cart routes
.get("/cart",tokenVerify,tryCatch(getUserCart))
.post("/cart",tokenVerify,tryCatch(updateUserCart))
.delete("/cart",tokenVerify,tryCatch(removeFromCart))

// wishlist routes
.get("/wishlist", tokenVerify , tryCatch(getUserWishList))
.post("/wishlist",tokenVerify, tryCatch(addToWishList))
.delete("/wishlist",tokenVerify,tryCatch(removeFromWishList))
export default router