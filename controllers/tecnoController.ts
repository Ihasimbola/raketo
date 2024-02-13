import { Request, Response } from "express";
import Tecno from "../entity/tecnoEntity";

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
      icon: `/upload/icon/${req.body.filePath}`,
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

export { createTecno, getAllTecnos };
