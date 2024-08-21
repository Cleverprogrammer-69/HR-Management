import { Employee } from "../models/employee.models.js";
import { departmentIdValidator } from "./department.validators.js";
import { designationIdValidator } from "./designation.validators.js";
import { jobNatureIdValidator } from "./jobNature.validators.js";
import { jobTypeIdValidator } from "./jobType.validators.js";

import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

const employeeDataValidator = async (employeeCredentials) => {
  const { phone, nic, emp_department, emp_designation, emp_type, emp_nature } =
    employeeCredentials;

  // Convert numeric fields to strings for consistent validation
  const emp_departmentStr = String(emp_department);
  const emp_designationStr = String(emp_designation);
  const emp_typeStr = String(emp_type);
  const emp_natureStr = String(emp_nature);

  // Log incoming data for debugging
  console.log("Validating employee credentials:", employeeCredentials);

  // Check for empty fields based on type
  if (
    Object.values(employeeCredentials).some((field) => {
      return typeof field === "string" && (field?.trim() === "" || !field);
    })
  ) {
    throw new ApiError(400, "All fields must be filled.");
  }

  // Validate numeric fields
  if (
    !validator.isNumeric(emp_departmentStr) ||
    !validator.isNumeric(emp_designationStr) ||
    !validator.isNumeric(emp_typeStr) ||
    !validator.isNumeric(emp_natureStr)
  ) {
    throw new ApiError(400, "Invalid field value.");
  }

  await departmentIdValidator(emp_departmentStr);
  await designationIdValidator(emp_designationStr);
  await jobNatureIdValidator(emp_natureStr);
  await jobTypeIdValidator(emp_typeStr);

  const existingEmployee = await Employee.findOne({
    $or: [{ phone }, { nic }],
  });
  if (existingEmployee) {
    throw new ApiError(409, "Employee phone or NIC is already in use.");
  }

  return true;
};

const employeeIdValidator = async (employeeId) => {
  if (!validator.isNumeric(employeeId)) {
    throw new ApiError(400, "Invalid employee ID.");
  }

  const employeeFound = await Employee.findById(employeeId).populate([
    {
      path: "emp_department",
      select: "department",
    },
    {
      path: "emp_designation",
      select: "designation",
    },
    {
      path: "emp_type",
      select: "job_type",
    },
    {
      path: "emp_nature",
      select: "job_nature",
    },
  ]);
  if (!employeeFound) {
    throw new ApiError(404, "Employee not found by ID.");
  }
  return employeeFound;
};

const employeeUpdateValidator = async (data) => {
  if (
    Object.values(data).some((field) => {
      return typeof field === "string" && (field?.trim() === "" || !field);
    })
  ) {
    throw new ApiError(400, "Changed fields can't be empty.");
  }
};

export { employeeDataValidator, employeeIdValidator, employeeUpdateValidator };
