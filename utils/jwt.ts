import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/types";
import { NextFunction, Request, Response } from "express";

type UserType = {
  userId: string;
  username: string;
  email: string;
};

const accessTokenSecret = "Raketo-app-ATS";
const refreshTokenSecret = "Raketo-app-RTS";

const generateAccessToken = (user: UserType) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const token = jwt.sign(
      user,
      accessTokenSecret,
      {
        expiresIn: 10,
        // expiresIn: 60 * 6,
      },
      function (err, encoded) {
        if (err) reject("Error signing token " + err);
        resolve(encoded);
      }
    );
  });
};

const generateRefreshToken = (user: UserType) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const refreshToken = jwt.sign(
      user,
      refreshTokenSecret,
      {
        expiresIn: "7d",
        // expiresIn: 10,
      },
      function (err, encoded) {
        if (err) reject("Error generating refresh token " + err);
        resolve(encoded);
      }
    );
  });
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, accessTokenSecret, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.body.userId = decoded.userId;
    next();
  });
};

const verifyRefresh = (req: Request, res: Response, next: NextFunction) => {
  // const refreshToken = req.header("Authorization")?.split(" ")[1];
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "You need to provide the refresh token.",
    });
  }

  jwt.verify(
    refreshToken,
    refreshTokenSecret,
    async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          message: "You need to log, the refresh token is no longer valid.",
        });
      }
      // console.log(decoded);
      const newToken = await generateAccessToken({
        userId: decoded.userId,
        username: decoded.username,
        email: decoded.email,
      });
      return res.status(200).json({
        token: newToken,
      });
    }
  );
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyRefresh,
};
