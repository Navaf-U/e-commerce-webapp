import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { blockUser, getAllUsers, getOneUser } from "../controllers/admin/adminUserController.js";
import { createProducts, deleteProducts, updateProducts } from "../controllers/admin/adminPorductController.js";
const router = express.Router()

router

// admin users routers
.get("/users",tryCatch(getAllUsers))
.get("/user/:id",tryCatch(getOneUser))
.patch("/user/:id",tryCatch(blockUser))

// admin product routes
.post("/product",tryCatch(createProducts))
.put("/product/:id",tryCatch(updateProducts))
.patch("/product/:id",tryCatch(deleteProducts))
export default router;
