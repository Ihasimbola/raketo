import express, { Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import {
  createTecno,
  getAllTecnos,
  getTotalItems,
  getTotalSpentTime,
} from "../controllers/tecnoController";
import { createUpload } from "../utils/multer";

const router = express.Router();

router.post("/", createUpload("icon"), verifyToken, createTecno);
router.get("/all", [verifyToken, getAllTecnos]);
router.get("/total-spent-time/:id", [verifyToken, getTotalSpentTime]);
router.get("/total-items/:id", [verifyToken, getTotalItems]);

export { router };
