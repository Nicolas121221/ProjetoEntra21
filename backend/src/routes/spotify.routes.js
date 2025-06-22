import { Router } from "express";
import { spotifyLogin, spotifyCallback, getSpotifySongById, spotifySearch } from "../controllers/spotify.controller.js";
const router = Router()

router.get('/login', spotifyLogin);
router.get('/callback', spotifyCallback);
router.get('/spotify/song/:id', getSpotifySongById)
router.get('/spotify/search/:id', spotifySearch)

export default router