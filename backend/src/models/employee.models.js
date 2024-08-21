import mongoose from "mongoose";
import mongooseAggregatePaginate  from "mongoose-aggregate-paginate-v2"
import { AutoIncrement } from "../db/index.js";


const employeeSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    emp_name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      set: function (value) {
        return value === "" ? undefined : value;
      },
      default: function get() {
        return `${this.emp_name}${this.phone}@gmail.com`;
      },
      unique: true,
    },
    phone: {
      type: String,
      default: 0,
      unique: true,
      trim: true,
      required: true,
    },
    prof_qualification: {
      type: String,
      required: true,
    },
    father: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    tech_skill: {
      type: String,
      set: function (value) {
        return value === "" ? undefined : value;
      },
      default: "none",
    },
    emp_department: {
      type: Number,
      ref: "Department",
      required: true,
    },
    emp_designation: {
      type: Number,
      ref: "Designation",
      required: true,
    },
    emp_type: {
      type: Number,
      ref: "JobType",
      required: true,
    },
    emp_nature: {
      type: Number,
      ref: "JobNature",
      required: true,
    },
  },
  { _id: false },
  { timestamps: true }
);
employeeSchema.plugin(AutoIncrement, {
  id: "employee_id_counter",
  inc_field: "_id",
});
employeeSchema.plugin(mongooseAggregatePaginate);

export const Employee = mongoose.model("Employee", employeeSchema)