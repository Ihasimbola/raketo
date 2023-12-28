import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import Users from './entity/userEntity';

const PORT = process.env.PORT || "4400";
const DB_URL: string = process.env.DB_URL || "";
const app = express();

app.set('PORT', PORT);

let db = null;

if(DB_URL) {
  db = mongoose.connect(
    DB_URL,
    {
      dbName: "raketo"
    }
  )
  .then(async () => {
    console.log('Connected to DB')
  })
  .catch((err) => console.error('error connecting to DB ', err));
} else {
  console.error('Import DB_URL from envirenement variable');
}


app.listen(
  app.get('PORT'),
 () => console.log("The server is listening at port ", app.get('PORT'))
);