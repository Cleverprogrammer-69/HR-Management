import mongoose from "mongoose";
import { AutoIncrement } from "../db/index.js";
const jobTypeSchema = new mongoose.Schema(
  {
    _id: {
      type: Number
    },
    job_type: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {_id: false},
  { timestamps: true }
);
jobTypeSchema.plugin(AutoIncrement, {
  id: "jobType_id_counter",
  inc_field: "_id",
});
export const JobType = mongoose.model("JobType", jobTypeSchema);
