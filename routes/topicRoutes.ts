import Topic from "../entity/topicEntity";
import express, { Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
} from "../controllers/topicController";

const router = express.Router();

router.get("/", [verifyToken, getTopics]);
router.post("/", [verifyToken, createTopic]);
router.patch("/:id", [verifyToken, updateTopic]);
router.delete("/:id", [verifyToken, deleteTopic]);

export { router };
