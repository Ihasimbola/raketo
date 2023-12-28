import mongoose from "mongoose";
import { ICatergory } from "../types/types";

const categorySchema = new mongoose.Schema<ICatergory>({
  name: {
    type: String,
    required: true,
  },
  tecnos: [ mongoose.Schema.Types.ObjectId ],
  total_spent_time: {
    type: String,
    default: "0"
  }
}, {
  timestamps: true
})

export default mongoose.model('Category', categorySchema);