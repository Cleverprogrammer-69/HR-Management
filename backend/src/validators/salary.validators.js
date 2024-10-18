import { ApiError } from "../utils/ApiError.js";
import { employeeIdValidator } from "./employee.validators.js";
import { Salary } from "../models/salary.models.js";
import validator from "validator";
const salaryDataValidator = async (salaryData) => {
  if (
    Object.values(salaryData).some((field) => {
      return typeof field === "string" && (field?.trim() === "" || !field);
    })
  ) {
    throw new ApiError(400, "All fields must be filled.");
  }
  // check employe id is valid or not
  const employeeFound = await employeeIdValidator(
    salaryData.employee_id?.trim()
  );
  // then check whether this employee is present or not if not present than validate it otherwise throw error that employee is already present
  const salaryExisted = await Salary.findOne({
    employee_id: employeeFound._id,
  });
  if (salaryExisted) {
    throw new ApiError(
      400,
      "This employee salary already existed. Click on update button to update it."
    );
  }
  //check for numeric inputs
  if (
    !validator.isNumeric(salaryData.basic?.trim()) ||
    !validator.isNumeric(salaryData.gross?.trim()) ||
    !validator.isNumeric(salaryData.medical?.trim()) ||
    !validator.isNumeric(salaryData.utility?.trim()) ||
    !validator.isNumeric(salaryData.house_rent?.trim())
  ) {
    throw new ApiError(400, "All fields should be numbers.");
  }
  return employeeFound;
};

const salaryUpdateValidator = (salaryData) => {
  if (
    Object.values(salaryData).some((field) => {
      return typeof field === "string" && (field?.trim() === "" || !field);
    })
  ) {
    throw new ApiError(400, "Changed fields can't be empty.");
  }
};

export { salaryDataValidator, salaryUpdateValidator };
