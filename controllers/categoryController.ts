import Category from "../entity/categoryEntity";
import { NextFunction, Request, Response, response } from "express";
import Tecno from "../entity/tecnoEntity";
import Topic from "../entity/topicEntity";
import { ITecno } from "../types/types";
import calculateTotalSpentTime from "../utils/calculateTotalSpentTime";
import { Spent_TimeType } from "../types/types";

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

    // const tecnos = {} as any;
    // for (let i = 0; i < categories.length; ++i) {
    //   tecnos[categories[i].name] = await Tecno.find({
    //     userId: req.body.userId,
    //     category: categories[i]._id,
    //   });
    // }

    // const categoriesName = Object.keys(tecnos) as Array<any>;

    // let topics = {} as any;

    // for (let i = 0; i < categoriesName.length; ++i) {
    //   let key = ""; // to store the current tecno name
    //   for (let j = 0; j < tecnos[categoriesName[i]].length; ++j) {
    //     key = tecnos[categoriesName[i]][j].name.toString(); // get tecno name per category
    //     if (typeof topics[tecnos[categoriesName[i]][j]]?.name && key !== "") {
    //       topics[key] = await Topic.find({
    //         // create new name in topics object
    //         userId: req.body.userId,
    //         tecno: tecnos[categoriesName[i]][j]._id, // if it pertains to the current tecno
    //       }).select("spent_time");
    //     }
    //   }
    // }

    // const tecnosName = Object.keys(topics);

    // // get the total of time spent
    // for (let i = 0; i < tecnosName.length; ++i) {
    //   let key = tecnosName[i].toString();
    //   const spentTimeArr = topics[key].map((item: any) => {
    //     return {
    //       ...item.spent_time,
    //     };
    //   });
    //   calculateTotalSpentTime(spentTimeArr);
    // }

    // const categoriesCount: any = {};

    // for (let i = 0; i < categories.length; ++i) {
    //   const count = await Tecno.countDocuments({
    //     userId: req.body.userId,
    //     category: categories[i]._id,
    //   });
    //   categoriesCount[categories[i].name] = count;
    //   categories[i].count = count;
    // }
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

    // console.log(topics);

    const tecnosName = Object.keys(topics);
    let responseData: Array<Spent_TimeType> = [];

    // get the total of time spent
    for (let i = 0; i < tecnosName.length; ++i) {
      let key = tecnosName[i].toString();
      const spentTimeArr = topics[key].map((item: any) => {
        return {
          ...item.spent_time,
        };
      });
      responseData.push({
        name: tecnosName[i],
        spent_time: calculateTotalSpentTime(spentTimeArr),
      });
      // responseData.push([calculateTotalSpentTime(spentTimeArr)]);
    }

    let resTest = {} as any;

    // sum of total spent time
    resTest.data = calculateTotalSpentTime(
      responseData.map((item) => item.spent_time)
    );
    // console.log(resTest);
    // for(let i = 0 ; i < responseData.length ; ++i){
    //   resTest.data = calculateTotalSpentTime(responseData[i].spent_time);
    // }

    res.status(200).json({
      data: resTest,
    });
  } catch (error: any) {
    throw Error("Error getting all total spent time " + error.message);
  }
}

export async function totalSpentTime(req: Request, res: Response) {
  try {
  } catch (error: any) {
    throw Error("Error getting all total spent time " + error.message);
  }
}

function returnData(res: Response) {
  setTimeout(() => {
    return res.status(200).json({ message: "okay" });
  }, 3500);
}
