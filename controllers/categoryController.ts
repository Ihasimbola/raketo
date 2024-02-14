import Category from "../entity/categoryEntity";
import { NextFunction, Request, Response } from "express";
import Tecno from "../entity/tecnoEntity";

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
    }).lean();

    const tecnos = new Promise((resolve, rej) => {
      const tecnos = {} as any;
      for (let i = 0; i < categories.length; ++i) {
        tecnos[categories[i].name] = Tecno.find({
          userId: req.body.userId,
          category: categories[i]._id,
        });
      }
      resolve(tecnos);
    });

    console.log(await tecnos);

    const categoriesCount: any = {};

    for (let i = 0; i < categories.length; ++i) {
      const count = await Tecno.countDocuments({
        userId: req.body.userId,
        category: categories[i]._id,
      });
      categoriesCount[categories[i].name] = count;
      categories[i].count = count;
    }
    return res.status(200).json({
      data: categories,
    });
  } catch (error: any) {
    throw Error("Error getting all categories " + error.message);
  }
}
