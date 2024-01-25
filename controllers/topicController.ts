import { Request, Response } from "express";
import Topic from "../entity/topicEntity";

async function createTopic(req: Request, res: Response) {
  try {
    const doc = await Topic.create(req.body);
    return res.status(201).json({
      doc,
    });
  } catch (error: any) {
    throw Error("Error creating topic " + error.message);
  }
}

export { createTopic };
