import mongoose from "mongoose";
const salarySchema = new mongoose.Schema(
  {
    employee_id: {
      type: Number,
      ref: "Employee",
      required: true,
      unique: true,
      trim: true,
    },
    gross: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
    basic: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
    house_rent: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
    utility: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
    medical: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
  },
  { timestamps: true }
);
export const Salary = mongoose.model("Salary", salarySchema);
