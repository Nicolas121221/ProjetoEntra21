import { getCifra } from "../controllers/cifra.controller.js";
import { Router } from "express";

const router = Router();

router.use("/:artist/:song", getCifra);

export default router;
