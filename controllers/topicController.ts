import { Request, Response } from "express";
import Topic from "../entity/topicEntity";
import { ITopic } from "../types/types";

export async function createTopic(req: Request, res: Response) {
  try {
    const topicExist = await Topic.findOne(
      {
        $and: [{ userId: req.body.userId }, { title: req.body.title }],
      },
      "userId title"
    ).exec();

    if (topicExist) {
      return res.status(409).json({
        message: "Singa efa voaforona",
      });
    }

    const topic = {
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
      tecno: req.body.tecnoId,
      isDone: false,
      spent_time: req.body.spent_time,
    };

    const doc = await Topic.create(topic);
    return res.status(201).json({
      message: "Singa voaforna tsara",
      doc,
    });
  } catch (error: any) {
    throw Error("Error creating topic " + error);
  }
}

export async function updateTopic(req: Request, res: Response) {
  try {
    console.log(req.body);
    // return res.status(200).json({ message: "OK" });

    if (req.body.isDone) {
      const updatedDoc = await Topic.findByIdAndUpdate(
        req.params.id,
        { isDone: req.body.isDone },
        {
          new: true,
        }
      );

      return res.status(200).json({
        doc: updatedDoc,
      });
    }

    const updateDoc = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        spent_time: {
          day: req.body.day,
          hour: req.body.hour,
          minute: req.body.minute,
          second: req.body.second,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ message: "Vita ny fanovana", doc: updateDoc });
  } catch (error) {
    throw Error("Error updating topic " + error);
  }
}

export async function getTopics(req: Request, res: Response) {
  try {
    const allTopics = await Topic.find({ userId: req.body.userId });
    return res.status(200).json({
      data: allTopics,
    });
  } catch (error: any) {
    throw Error("Error finding all topics" + error.message);
  }
}

export async function deleteTopic(req: Request, res: Response) {
  try {
    const doc = await Topic.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Voafafa.",
      doc,
    });
  } catch (error: any) {
    console.log("Error deleting topic at " + error.message);
    throw Error(error.message);
  }
}
