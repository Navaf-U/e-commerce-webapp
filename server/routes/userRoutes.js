import express from 'express'
import tryCatch from '../utils/tryCatch.js'
import { tokenVerify } from '../middlewares/tokenVerify.js'
import { getUserCart, removeFromCart, updateUserCart } from "../controllers/user/cartController.js"
import {allProducts,getProductById,getProductCategory} from '../controllers/publicController.js'
import { addToWishList, getUserWishList, removeFromWishList } from '../controllers/user/wishListController.js'
import { cancelOneOrder, getAllOrders, getOneOrder, orderCashOnDelivery, orderWithStripe, publicKeySend, StripeSuccess } from '../controllers/user/orderController.js'

const router = express.Router()

router

// product routes
.get("/products",tryCatch(allProducts))
.get("/product/:id",tryCatch(getProductById))
.get("/products/category/:type",tryCatch(getProductCategory))

// cart routes
.get("/cart",tokenVerify,tryCatch(getUserCart))
.post("/cart",tokenVerify,tryCatch(updateUserCart))
.delete("/cart",tokenVerify,tryCatch(removeFromCart))

// wishlist routes
.get("/wishlist", tokenVerify , tryCatch(getUserWishList))
.post("/wishlist",tokenVerify, tryCatch(addToWishList))
.delete("/wishlist",tokenVerify,tryCatch(removeFromWishList))

// order routes
.get("/orders",tokenVerify,tryCatch(getAllOrders))
.get("/orders/:orderID",tokenVerify,tryCatch(getOneOrder))
.post("/orders/cod",tokenVerify,tryCatch(orderCashOnDelivery)) //create new order w payment status cod   
.post("/orders/stripe/checkout" ,tokenVerify,tryCatch(orderWithStripe)) // create new order with stripe
.put("/orders/:orderID",tokenVerify,tryCatch(StripeSuccess))  // success route for stripe
.get("/orders/publickey",tokenVerify,tryCatch(publicKeySend)) // getting stripe public key on the client
.patch("/orders/stripe/success/:sessionID",tokenVerify,tryCatch(cancelOneOrder))

export default router