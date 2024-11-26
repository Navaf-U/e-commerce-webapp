import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { getAllUsers, getOneUser } from "../controllers/admin/userController.js";
const router = express.Router()

router
.get("/users",tryCatch(getAllUsers))
.get("/user/:id",tryCatch(getOneUser))

export default router;
