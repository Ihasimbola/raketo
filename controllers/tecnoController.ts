import { Request, Response } from "express";
import Tecno from "../entity/tecnoEntity";

async function createTecno(req: Request, res: Response) {
  try {
    const doc = await Tecno.create(req.body);
    return res.status(201).json({
      doc,
    });
  } catch (error: any) {
    throw Error("Error creating Tecno " + error.message);
  }
}

export { createTecno };
