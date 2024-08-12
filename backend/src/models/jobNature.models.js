import mongoose from "mongoose";
import { AutoIncrement } from "../db/index.js";
const jobNatureSchema = new mongoose.Schema(
  {
    _id:{
      type: Number
    },
    job_nature: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {_id: false},
  { timestamps: true }
);
jobNatureSchema.plugin(AutoIncrement, {
  id: "jobNature_id_counter",
  inc_field: "_id",
});
export const JobNature = mongoose.model("JobNature", jobNatureSchema);
