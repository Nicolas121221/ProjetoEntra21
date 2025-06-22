import { Router } from "express";
import { getSpotifyUser, getSpotifyUserById, createSpotifyUser } from "../controllers/spotifyUser.controller.js";
const router = Router()

router.get('/', getSpotifyUser)
router.get('/:id', getSpotifyUserById)
router.post('/create', createSpotifyUser)

export default router