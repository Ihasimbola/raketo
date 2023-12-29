import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/types";
import { NextFunction, Request, Response } from "express";

const accessTokenSecret = "Raketo-app-ATS";
const refreshTokenSecret = "Raketo-app-RTS";

const generateAccessToken = (user: IUser) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const token = jwt.sign(
      user,
      accessTokenSecret,
      {
        expiresIn: 3600 * 6,
      },
      function (err, encoded) {
        if (err) reject("Error signing token " + err);
        resolve(encoded);
      }
    );
  });
};

const generateRefreshToken = (user: IUser) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const refreshToken = jwt.sign(
      user,
      refreshTokenSecret,
      {
        expiresIn: "7d",
      },
      function (err, encoded) {
        if (err) reject("Error generating refresh token " + err);
        resolve(encoded);
      }
    );
  });
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, accessTokenSecret, (err, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.body.userId = decoded.userId;
    next();
  });
};
