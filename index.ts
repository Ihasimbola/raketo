import "dotenv/config";
import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import { router as routes } from "./routes";
import cors from "cors";
import { verifyToken } from "./utils/jwt";
import multer from "multer";
import path from "path";

const PORT = process.env.PORT || "4400";
const DB_URL: string = process.env.DB_URL || "";
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: "*",
  })
);
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
app.use("/icon", express.static(path.join(__dirname, "upload", "icon")));

// app.post(
//   "/test",
//   function (req: Request, res: Response, next: NextFunction) {
//     console.log("first middleware");
//     if (req.body.data == "next") next();
//     return res.status(200).json({ message: "first middleware return" });
//   },
//   function (req: Request, res: Response) {
//     console.log("second middleware");
//     return res.status(200).json({ message: "second middleware return" });
//   }
// );

// app.post(
//   "/icon",
//   upload("/icon", "icon"),
//   function (req: Request, res: Response) {
//     console.log(req.file);
//     console.log(req.body.name);
//     res.json({ message: "received" });
//   }
// );

// app.post(
//   "/photo",
//   upload("/photo", "photo"),
//   function (req: Request, res: Response) {
//     console.log(req.file);
//     console.log(req.body.name);
//     res.json({ message: "received" });
//   }
// );

app.listen(app.get("PORT"), () =>
  console.log("The server is listening at port ", app.get("PORT"))
);
