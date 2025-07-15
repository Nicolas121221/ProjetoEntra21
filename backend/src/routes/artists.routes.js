import { Router } from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
} from "../controllers/artists.controller.js";

const router = Router();

router.get("/", getAllArtists);
router.get("/:id", getArtistById);
router.delete("/:id", deleteArtist);
router.post("/", createArtist);

export default router;
