import mongoose from "mongoose";
import { ITecno } from "../types/types";

const tecnoSchema = new mongoose.Schema<ITecno>({
  name: {
    type: String,
    required: true
  },
  category: mongoose.Schema.Types.ObjectId,
  topics: [ mongoose.Schema.Types.ObjectId ],
  icon: {
    type: String,
  },
  total_spent_time: {
    type: String,
    default: "0",
  }
},
{
  timestamps: true
})

export default mongoose.model('Tecno', tecnoSchema);