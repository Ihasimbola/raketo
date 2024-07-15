import Category from "../entity/categoryEntity";
import { NextFunction, Request, Response, response } from "express";
import Tecno from "../entity/tecnoEntity";
import Topic from "../entity/topicEntity";
import { ITecno } from "../types/types";
import calculateTotalSpentTime from "../utils/calculateTotalSpentTime";
import { Spent_TimeType } from "../types/types";
import formatDisplay from "../utils/formatDisplay";

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // find if category exist
    const categoryExist = await Category.findOne(
      {
        $and: [{ userId: req.body.userId }, { name: req.body.name }],
      },
      "name userId"
    ).exec();

    // find if category exists, case may be different but already exist
    const categories = await Category.find().select("name");
    const categoriesName = categories.map((item) =>
      item.name.toLocaleLowerCase()
    );

    // retrun 409 if category already exist but different case
    if (categoriesName.includes(req.body.name.toLocaleLowerCase())) {
      return res.status(409).json({
        message: "Efa voaforona.",
      });
    }

    // return 409 if category already exist
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

export async function getTotalSpentTime(req: Request, res: Response) {
  try {
    const categories = await Category.find({
      userId: req.body.userId,
      _id: req.params.id,
    }).lean();

    const tecnos = {} as any;
    for (let i = 0; i < categories.length; ++i) {
      tecnos[categories[i].name] = await Tecno.find({
        userId: req.body.userId,
        category: categories[i]._id,
      });
    }

    const categoriesName = Object.keys(tecnos) as Array<any>;

    let topics = {} as any;

    for (let i = 0; i < categoriesName.length; ++i) {
      let key = ""; // to store the current tecno name
      for (let j = 0; j < tecnos[categoriesName[i]].length; ++j) {
        key = tecnos[categoriesName[i]][j].name.toString(); // get tecno name per category
        if (typeof topics[tecnos[categoriesName[i]][j]]?.name && key !== "") {
          topics[key] = await Topic.find({
            // create new name in topics object
            userId: req.body.userId,
            tecno: tecnos[categoriesName[i]][j]._id, // if it pertains to the current tecno
          }).select("spent_time");
        }
      }
    }

    const tecnosName = Object.keys(topics);
    let spentTimeArr: Array<Spent_TimeType> = [];

    // get the total of time spent
    for (let i = 0; i < tecnosName.length; ++i) {
      let key = tecnosName[i].toString();
      const currentSpentTime = topics[key].map((item: any) => {
        return {
          ...item.spent_time,
        };
      });
      spentTimeArr.push({
        name: tecnosName[i],
        spent_time: calculateTotalSpentTime(currentSpentTime),
      });
    }

    let spentTime = {} as any;

    // sum of total spent time
    spentTime.data = calculateTotalSpentTime(
      spentTimeArr.map((item) => item.spent_time)
    );

    let responseData = `${
      spentTime.data.day === 0 ? "" : formatDisplay(spentTime.data.day) + ":"
    }${formatDisplay(spentTime.data.hour)}:${formatDisplay(
      spentTime.data.minute
    )}:${formatDisplay(spentTime.data.second)}`;
    res.status(200).json({
      data: responseData,
    });
  } catch (error: any) {
    throw Error("Error getting all total spent time " + error.message);
  }
}

export async function getAllItems(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({
        message: "Bad Request.",
      });
    }
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found." });

    // if category exist, find tecnos in the category
    const tecnos = await Tecno.find({
      $and: [
        {
          userId: req.body.userId,
        },
        {
          category: categoryId,
        },
      ],
    });

    // find all items in topics
    let topics = [] as any;
    for (let i = 0; i < tecnos.length; ++i) {
      const topicsDoc = await Topic.find({
        $and: [
          {
            userId: req.body.userId,
          },
          {
            tecno: tecnos[i]._id,
          },
        ],
      });

      topics.push(topicsDoc);
    }

    const totalItems = topics.reduce((acc: number, currValue: any) => {
      return acc + currValue.length;
    }, 0);

    return res.status(200).json({
      data: `Singa ${totalItems}`,
    });
  } catch (error) {}
}
