import express from "express";
import { verifyToken } from "../utils/jwt";
import { createTecno } from "../controllers/tecnoController";

const router = express.Router();

router.post("/", [verifyToken, createTecno]);

export { router };
