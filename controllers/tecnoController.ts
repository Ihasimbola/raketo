import { Request, Response } from "express";
import Tecno from "../entity/tecnoEntity";
import Topics from "../entity/topicEntity";
import calculateTotalSpentTime from "../utils/calculateTotalSpentTime";
import formatDisplay from "../utils/formatDisplay";

async function getAllTecnos(req: Request, res: Response) {
  try {
    const tecnos = await Tecno.find({
      userId: req.body.userId,
    }).exec();

    return res.status(200).json({
      data: tecnos,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function createTecno(req: Request, res: Response) {
  try {
    const tecnoExist = await Tecno.findOne(
      {
        $and: [{ userId: req.body.userId }, { name: req.body.name }],
      },
      "userId name"
    ).exec();

    if (tecnoExist) {
      return res.status(409).json({
        message: "Tecno efa voaforona.",
      });
    }

    const tecno = {
      name: req.body.name,
      userId: req.body.userId,
      category: req.body.categoryId,
      icon: `${req.body.filePath}`,
    };

    const doc = await Tecno.create(tecno);
    return res.status(201).json({
      message: "Tecno voaforona tsara",
      doc,
    });
  } catch (error: any) {
    throw Error("Error creating Tecno " + error.message);
  }
}

export async function getTotalSpentTime(req: Request, res: Response) {
  try {
    const allTecno = await Tecno.find({
      userId: req.body.userId,
      _id: req.params.id,
    }).lean();

    const topics = await Topics.find({
      userId: req.body.userId,
      tecno: req.params.id,
    });

    const spentTime = calculateTotalSpentTime(
      topics.map((topic: any) => topic.spent_time)
    );

    const responseData = `${
      spentTime.day === 0 ? "" : formatDisplay(spentTime.day) + ":"
    }${formatDisplay(spentTime.hour)}:${formatDisplay(
      spentTime.minute
    )}:${formatDisplay(spentTime.second)}`;

    return res.status(200).json({ data: responseData });
  } catch (error: any) {
    throw Error("Error getting all total spent time " + error.message);
  }
}

export async function getTotalItems(req: Request, res: Response) {
  try {
    const allTecno = await Tecno.find({
      userId: req.body.userId,
      _id: req.params.id,
    }).lean();

    const topics = await Topics.find({
      userId: req.body.userId,
      tecno: req.params.id,
    });

    return res.status(200).json({
      data: `singa ${topics.length}`,
    });
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}

export { createTecno, getAllTecnos };
