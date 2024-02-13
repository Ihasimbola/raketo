import { NextFunction, Request, Response } from "express";

export async function saveImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req?.file);
    return res.status(200).json({ message: "created" });
  } catch (error) {}
}
