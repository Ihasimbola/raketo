import express, { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { verifyRefresh, verifyToken } from "../utils/jwt";

const router = express.Router();

router.post("/", UserController.createUser);
router.post("/auth", verifyToken, (req: Request, res: Response) =>
  res.json({})
);
router.post("/auth/verifyRefresh", verifyRefresh);
router.post("/login", UserController.login);

export { router };
