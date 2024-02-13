import Category from "../entity/categoryEntity";
import { NextFunction, Request, Response } from "express";

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryExist = await Category.findOne(
      {
        $and: [{ userId: req.body.userId }, { name: req.body.name }],
      },
      "name userId"
    ).exec();

    if (categoryExist) {
      return res.status(409).json({
        message: "Sokajy efa voaforona.",
      });
    }

    const doc = await Category.create(req.body);
    return res.status(201).json({
      message: "Sokajy voaforona tsara.",
      doc,
    });
  } catch (err: any) {
    throw Error("Error creating category " + err.message);
  }
}

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await Category.find({
      userId: req.body.userId,
    });
    return res.status(200).json({
      data: categories,
    });
  } catch (error: any) {
    throw Error("Error getting all categories " + error.message);
  }
}
