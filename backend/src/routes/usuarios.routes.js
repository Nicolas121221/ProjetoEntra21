import { Router } from "express";
import { getUsers, getUsersById, createUser } from "../controllers/usuarios.controller.js";
const router = Router()

router.get('/', getUsers)
router.get('/:id', getUsersById)
router.post('', createUser)

export default router