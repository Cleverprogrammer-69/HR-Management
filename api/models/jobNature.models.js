import mongoose from "mongoose";

const jobNatureSchema = new mongoose.Schema(
  {
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
  { timestamps: true }
);

export const JobNature = mongoose.model("JobNature", jobNatureSchema);
