import { Router } from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
} from "../controllers/artists.controller.js";

const router = Router();

router.get("/", getAllArtists);
router.get("/:id", getArtistById);
router.delete("/:id", deleteArtist);
router.post("/", createArtist);
router.put("/:id", updateArtist)

export default router;
