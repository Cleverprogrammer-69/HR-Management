import { Employee } from "../models/employee.models.js";
import { departmentIdValidator } from './department.validators.js'
import { designationIdValidator } from "./designation.validators.js";
import { jobNatureIdValidator } from "./jobNature.validators.js";
import { jobTypeIdValidator } from "./jobType.validators.js";

import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

const employeeDataValidator = async (employeeCredentials) => {
  const { phone, nic, emp_department, emp_designation, emp_type, emp_nature } =
    employeeCredentials;
  if (
    Object.values(employeeCredentials).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  await departmentIdValidator(emp_department)
  await designationIdValidator(emp_designation)
  await jobNatureIdValidator(emp_nature)
  await jobTypeIdValidator(emp_type)

  const existingEmployee = await Employee.findOne({
    $or: [{ phone }, { nic }],
  });
  if (existingEmployee) {
    throw new ApiError(
      409,
      "employee phone or nic is already in use."
    );
  }

  return true;
};

const employeeIdValidator = async (employeeId) => {
  // check if id is validate mongoose id

  if (!validator.isNumeric(employeeId)) {
    throw new ApiError(400, "Invalid employee Id");
  }

  // check if we have employee with that id

  const employeeFound = await Employee.findById(employeeId);
  if (!employeeFound) {
    throw new ApiError(404, "employee not found by Id");
  }
  return employeeFound;
};

const employeeUpdateValidator = async (data) => {
  if (
    Object.values(data).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    throw new ApiError(400, "Changed fields can't be empty");
  }
};

export {
  employeeDataValidator,
  employeeIdValidator,
  employeeUpdateValidator,
};
