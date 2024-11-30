import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { getAllUserCarts } from "../controllers/admin/adminCartController.js";
import { verifyTokenAdmin } from "../middlewares/tokenVerify.js";
import { blockUser, getAllUsers, getOneUser } from "../controllers/admin/adminUserController.js";
import { createProducts, deleteProducts, updateProducts } from "../controllers/admin/adminPorductController.js";
import { getOrderByUser, getTotalOrders, getTotalRevenue, totalPurchaseOfOrders, updatePaymentStatus, updateShippingStatus } from "../controllers/admin/adminOrderController.js";
import { adminLogin, loginUser } from "../controllers/authController.js";
import { allProducts, getProductById, getProductCategory } from "../controllers/publicController.js";
const router = express.Router()

router

// admin login section
.post("/login",tryCatch(adminLogin))

// admin users routers
.get("/users",verifyTokenAdmin,tryCatch(getAllUsers))
.get("/user/:id",verifyTokenAdmin,tryCatch(getOneUser))
.patch("/user/:id",verifyTokenAdmin,tryCatch(blockUser))

// admin product routes
.get("/products",verifyTokenAdmin,tryCatch(allProducts)) 
.get("/product/:id",verifyTokenAdmin,tryCatch(getProductById))
.get("/products/category/:type",verifyTokenAdmin,tryCatch(getProductCategory))
//--
.post("/product/create",verifyTokenAdmin,tryCatch(createProducts))
.put("/product/update/:id",verifyTokenAdmin,tryCatch(updateProducts))
.patch("/product/:id",verifyTokenAdmin,tryCatch(deleteProducts))


// admin cart routes
.get("/carts",verifyTokenAdmin,tryCatch(getAllUserCarts))

// admin orders routes
.get("/orders",verifyTokenAdmin,tryCatch(getTotalOrders))
.get("/orders/user/:id",verifyTokenAdmin,tryCatch(getOrderByUser))
.get("/orders/total",verifyTokenAdmin,tryCatch(totalPurchaseOfOrders))
.get("/orders/revenue",verifyTokenAdmin,tryCatch(getTotalRevenue))
.patch("/orders/shipping/:id",verifyTokenAdmin,tryCatch(updateShippingStatus))
.patch("/orders/payment/:id",verifyTokenAdmin,tryCatch(updatePaymentStatus))

export default router;
