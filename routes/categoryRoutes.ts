import express from "express";
import { createCategory } from "../controllers/categoryController";
import { verifyToken } from "../utils/jwt";

const router = express.Router();

router.post("/", [verifyToken, createCategory]);

export { router };
