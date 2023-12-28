import mongoose from "mongoose";
import { ITopic } from "../types/types";

const topicSchema = new mongoose.Schema<ITopic>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: mongoose.Schema.Types.ObjectId,
  spent_time: {
    type: String,
    default: "0"
  },
  tecno: mongoose.Schema.Types.ObjectId
}, 
{
  timestamps: true
})

export default mongoose.model('Topic', topicSchema);