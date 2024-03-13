import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../types/types";
import validator from "validator";
import bcrypt from "bcrypt";

interface UserModel extends Model<IUser> {
  authenticateUser(userId: string, password: string): IUser;
}

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw Error("Email is invalid format");
        }
      },
    },
    cachedPokemon: {
      type: Array<string>,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.static(
  "authenticateUser",
  async function (username: string, password: string) {
    try {
      const user: any = await Users.findOne({ username: username });
      if (!user) {
        throw Error("Mila mamorona kaonty.");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw Error("Misy diso fa avereno.");
      }

      return user as IUser;
    } catch (err: any) {
      // console.error(err.message);
      throw Error(err.message);
    }
  }
);

const Users = mongoose.model<IUser, UserModel>("Users", userSchema);
export default Users;
