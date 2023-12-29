import express from "express";
import { UserController } from "../controllers/userController";
import { verifyToken } from "../utils/jwt";

const router = express.Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.login);

export default router;
