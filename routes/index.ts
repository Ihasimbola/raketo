import { router as userRoutes } from "./userRoutes";
import { router as categoryRoutes } from "./categoryRoutes";
import { router as topicRoutes } from "./topicRoutes";
import { router as tecnoRoutes } from "./tecnoRoutes";
import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/category", categoryRoutes);
router.use("/topic", topicRoutes);
router.use("/tecno", tecnoRoutes);

export { router };
