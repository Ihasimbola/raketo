import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController";
import { verifyToken } from "../utils/jwt";

const router = express.Router();

router.post("/", [verifyToken, createCategory]);
router.get("/", [verifyToken, getCategories]);

export { router };
