import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { blockUser, getAllUsers, getOneUser } from "../controllers/admin/userController.js";
const router = express.Router()

router
.get("/users",tryCatch(getAllUsers))
.get("/user/:id",tryCatch(getOneUser))
.patch("/user/:id",tryCatch(blockUser))

export default router;
