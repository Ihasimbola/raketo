import mongoose from "mongoose";
import { ITopic } from "../types/types";

const topicSchema = new mongoose.Schema<ITopic>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tecno: mongoose.Schema.Types.ObjectId,
    spent_time: {
      type: Object,
    },
    isDone: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Topic", topicSchema);
