import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { blockUser, getAllUsers, getOneUser } from "../controllers/admin/adminUserController.js";
import { createProducts, deleteProducts, updateProducts } from "../controllers/admin/adminPorductController.js";
import { verifyTokenAdmin } from "../middlewares/tokenVerify.js";
import { getAllOrders } from "../controllers/user/orderController.js";
import { getOrderByUser, getTotalOrders, totalNumberOfOrders, updatePaymentStatus, updateShippingStatus } from "../controllers/admin/adminOrderController.js";
const router = express.Router()

router

// admin users routers
.get("/users",verifyTokenAdmin,tryCatch(getAllUsers))
.get("/user/:id",verifyTokenAdmin,tryCatch(getOneUser))
.patch("/user/:id",verifyTokenAdmin,tryCatch(blockUser))

// admin product routes
.post("/product",verifyTokenAdmin,tryCatch(createProducts))
.put("/product/:id",verifyTokenAdmin,tryCatch(updateProducts))
.patch("/product/:id",verifyTokenAdmin,tryCatch(deleteProducts))

// admin orders routes
.get("/orders",verifyTokenAdmin,tryCatch(getAllOrders))
.get("/orders/user/:id",verifyTokenAdmin,tryCatch(getOrderByUser))
.get("/orders/total",verifyTokenAdmin,tryCatch(totalNumberOfOrders))
.get("/orders/revenue",verifyTokenAdmin,tryCatch(getTotalOrders))
.patch("/orders/shipping/:id",verifyTokenAdmin,tryCatch(updateShippingStatus))
.patch("/orders/payment/:id",verifyTokenAdmin,tryCatch(updatePaymentStatus))

export default router;
