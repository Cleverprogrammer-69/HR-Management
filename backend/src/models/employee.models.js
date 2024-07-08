import mongoose from "mongoose";
import mongooseAggregatePaginate  from "mongoose-aggregate-paginate-v2"
const employeeSchema = new mongoose.Schema(
  {
    emp_name: {
      type: String,
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
    },
    emp_department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    emp_designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },
    emp_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobType",
      required: true,
    },
    emp_nature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobNature",
      required: true,
    },
  },
  { timestamps: true }
);
employeeSchema.pre()
employeeSchema.plugin(mongooseAggregatePaginate);
export const Employee = mongoose.model("Employee", employeeSchema)