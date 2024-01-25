import mongoose from "mongoose";
import { ITecno } from "../types/types";

const tecnoSchema = new mongoose.Schema<ITecno>(
  {
    name: {
      type: String,
      required: true,
    },
    category: mongoose.Schema.Types.ObjectId,
    icon: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tecno", tecnoSchema);
