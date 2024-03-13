import express from "express";
import { verifyToken } from "../utils/jwt";
import { PokemonController } from "../controllers/pokemonController";

const router = express.Router();

router.get("/", [verifyToken, PokemonController.getAll]);
router.post("/catch/:id", [verifyToken, PokemonController.catch]);
router.post("/release/:id", [verifyToken, PokemonController.release]);

export { router };
