import mongoose from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  password: string;
  email: string;
}

export interface ICatergory {
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
}

export interface ITecno {
  name: string;
  topics: Array<string>;
  icon: string;
  total_spent_time: string;
  category: string;
}

export interface ITopic {
  name: string;
  description: string;
  spent_time: string;
  category: string;
  tecno: string;
}
