import "dotenv/config";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import Users from "./entity/userEntity";
import { router as routes } from "./routes";
import multer from "multer";
import { upload } from "./utils/multer";

const PORT = process.env.PORT || "4400";
const DB_URL: string = process.env.DB_URL || "";
const app = express();
// const upload = multer({ dest: "uploads/" });

app.set("PORT", PORT);
app.use(express.json());

let db = null;

if (DB_URL) {
  db = mongoose
    .connect(DB_URL, {
      dbName: "raketo",
    })
    .then(async () => {
      console.log("Connected to DB");
    })
    .catch((err) => console.error("error connecting to DB ", err));
} else {
  console.error("Import DB_URL from envirenement variable");
}

app.use("/api", routes);

app.post(
  "/icon",
  upload("/icon", "icon"),
  function (req: Request, res: Response) {
    console.log(req.file);
    console.log(req.body.name);
    res.json({ message: "received" });
  }
);

app.post(
  "/photo",
  upload("/photo", "photo"),
  function (req: Request, res: Response) {
    console.log(req.file);
    console.log(req.body.name);
    res.json({ message: "received" });
  }
);

app.listen(app.get("PORT"), () =>
  console.log("The server is listening at port ", app.get("PORT"))
);
