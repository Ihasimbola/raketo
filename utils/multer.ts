import multer from "multer";

export function upload(destination: string, filename: string) {
  return multer({ dest: `upload/${destination}/` }).single(filename);
}
