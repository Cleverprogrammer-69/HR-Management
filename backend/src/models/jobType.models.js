import mongoose from "mongoose";

const jobTypeSchema = new mongoose.Schema(
  {
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
  { timestamps: true }
);

export const JobType = mongoose.model("JobType", jobTypeSchema);
