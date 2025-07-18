import { Router } from "express";
import { createUser, getAllUsers, getUserByEmail, getUserById } from "../controllers/users.controller.js";
import { generatePasswordMiddleware } from "../middlewares/user.middleware.js";
const router = Router()

router.post('/',generatePasswordMiddleware, createUser)
router.get('/', getAllUsers)
router.get('/id/:id', getUserById)
router.get('/email', getUserByEmail)

export default router