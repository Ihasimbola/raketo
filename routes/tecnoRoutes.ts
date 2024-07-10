import express from "express";
import { verifyToken } from "../utils/jwt";
import { createTecno, getAllTecnos } from "../controllers/tecnoController";
import { createUpload } from "../utils/multer";

const router = express.Router();

router.post("/", createUpload("icon"), verifyToken, createTecno);
router.get("/all", [verifyToken, getAllTecnos]);

export { router };
