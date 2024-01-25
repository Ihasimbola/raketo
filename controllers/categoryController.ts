import Category from "../entity/categoryEntity";
import { NextFunction, Request, Response } from "express";

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const doc = await Category.create(req.body);
    return res.status(201).json({
      doc,
    });
  } catch (err: any) {
    throw Error("Error creating category " + err.message);
  }
}
