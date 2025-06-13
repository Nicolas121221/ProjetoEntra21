import { Router } from "express";
import { getUsers, getUsersById, createUser } from "../controllers/usuarios.controller.js";
import { checkPassword, generatePassword } from "../middlewares/password.middleware.js";
const router = Router()

router.get('/', getUsers)
router.get('/:id', getUsersById)
router.post('', generatePassword, createUser)
router.get('/password/:id', checkPassword)

export default router