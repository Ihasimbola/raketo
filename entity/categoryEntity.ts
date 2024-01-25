import mongoose from "mongoose";
import { ICatergory } from "../types/types";

const categorySchema = new mongoose.Schema<ICatergory>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
