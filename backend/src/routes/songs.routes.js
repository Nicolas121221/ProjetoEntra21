import { Router } from "express";
import { createSong, deleteSong, getAllSongs , getSongById , updateSong} from "../controllers/songs.controller.js";
const router = Router()

router.get('/', getAllSongs)
router.get('/:id', getSongById)
router.delete('/:id', deleteSong)
router.post('/', createSong)
router.put('/:id', updateSong)

export default router