import Topic from "../entity/topicEntity";
import express from "express";
import { verifyToken } from "../utils/jwt";
import { createTopic } from "../controllers/topicController";

const router = express.Router();

router.post("/", [verifyToken, createTopic]);

export { router };
