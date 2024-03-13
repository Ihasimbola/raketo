import { router as userRoutes } from "./userRoutes";
import express from "express";
import { router as pokemonRoutes } from "./pokemonRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/pokemon", pokemonRoutes);

export { router };
