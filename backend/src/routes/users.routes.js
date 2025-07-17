import { Router } from "express";
import { createUser } from "../controllers/users.controller.js";
import { generatePasswordMiddleware } from "../middlewares/user.middleware.js";
const router = Router()

router.post('',generatePasswordMiddleware, createUser)

export default router