import mongoose from "mongoose";
import { IUser } from "../types/types";
import validator from "validator";

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value: string) {
      if(!validator.isEmail(value)) {
        throw Error('Email is invalid format');
      }
    }
  }
},
{
  timestamps: true
});

const Users = mongoose.model('Users', userSchema);
export default Users