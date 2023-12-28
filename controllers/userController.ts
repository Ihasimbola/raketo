import { NextFunction, Request, Response } from "express";
import Users from "../entity/userEntity";
import { IUser } from "../types/types";

export class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await Users.create(req.body);
      res.status(200).json({
        message: "User created.",
      });
    } catch (err) {
      throw Error("Error creating user" + err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await Users.authenticateUser(
        req.body.username,
        req.body.password
      );

      if (user) {
        res.status(200).json({
          message: "Authentic",
          data: user,
        });
      }
    } catch (err: any) {
      console.log("Error authenticating user" + err);
      res.status(401).json({
        message: err.message,
      });
    }
  }
}
