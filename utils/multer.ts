import multer from "multer";
import fs from "fs";
import path from "path";
import { uid } from "uid";

export function createUpload(destination: string, filename?: string) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dirPath = path.join(__dirname, "..", "upload", destination);
      console.log("req.body multer => ", req.body);
      if (!fs.existsSync(dirPath)) {
        fs.mkdir(
          path.join(__dirname, "..", "upload", destination),
          { recursive: true },
          function (err, path) {
            if (err) throw err;
            cb(null, dirPath);
          }
        );
      } else {
        cb(null, dirPath);
      }
    },
    filename: function (req, file, cb) {
      const fileName = uid(16) + "-" + file.originalname;
      req.body.filePath = fileName;
      cb(null, fileName);
    },
  });

  return multer({ storage: storage }).single(destination);
}
