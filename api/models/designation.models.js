import mongoose from "mongoose";

const designationSchema = new mongoose.Schema(
  {
    designation: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    abbrevation: {
        type: String,
        required:true,
        unique: true
    }
  },
  { timestamps: true }
);

export const Designation = mongoose.model("Designation", designationSchema);
