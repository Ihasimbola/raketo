import express from "express";
import {
  createCategory,
  getAllItems,
  getCategories,
  getTotalSpentTime,
} from "../controllers/categoryController";
import { verifyToken } from "../utils/jwt";

const router = express.Router();

router.post("/", [verifyToken, createCategory]);
router.get("/", [verifyToken, getCategories]);
// router.get("/total-spent-time/:id", [verifyToken, totalSpentTime]);
router.get("/total-spent-time/:id", [verifyToken, getTotalSpentTime]);
router.get("/total-items/:id", [verifyToken, getAllItems]);

export { router };
