import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { salaryDataValidator } from "../validators/salary.validators.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Salary } from "../models/salary.models.js";
import { ApiError } from "../utils/ApiError.js";
import { employeeIdValidator } from "../validators/employee.validators.js";
const createSalary = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { employee_id, basic, gross, house_rent, medical, utility } = req.body;
  const employeeFound = await salaryDataValidator({
    employee_id,
    basic,
    gross,
    house_rent,
    medical,
    utility,
  });
  const newSalary = await Salary.create({
    employee_id: Number(employee_id),
    basic: Number(basic),
    gross: Number(gross),
    house_rent: Number(house_rent),
    medical: Number(medical),
    utility: Number(utility),
  });
  const createdSalary = await Salary.findById(newSalary._id);
  if (!createdSalary) {
    throw new ApiError(501, "Something went wrong while creating new salary.");
  }
  res
    .status(201)
    .json(new ApiResponse(201, createdSalary, "Salary created sucessfuly."));
});

const getOneSalary = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const employeeFound = await employeeIdValidator(employeeId);
  const salaryFound = await Salary.findOne({
    employee_id: employeeId,
  }).populate("employee_id");
  if (!salaryFound) {
    throw new ApiError(404, "Salary not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, [salaryFound], "Salary fetched successfully."));
});

const updateSalary = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  // const {basic, gross, house_rent, medical, utility} = req.body
  const employeeFound = await employeeIdValidator(employeeId);
  console.log(employeeFound);
  const salaryFound = await Salary.findOne({ employee_id: employeeFound._id });
  if (!salaryFound) {
    throw new ApiError(
      404,
      "Salary not found, please add salary of this employee first."
    );
  }
  console.log(salaryFound);
  const updatedSalary = await Salary.findOneAndUpdate(
    { employee_id: employeeId },
    {
      ...req.body,
    },
    {
      new: true,
    }
  );

  if (!updatedSalary) {
    throw new ApiError(500, "Something went wrong while updating the salary");
  }
  console.log(updatedSalary);

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedSalary, "Salary is updated successfully.")
    );
});
export { createSalary, getOneSalary, updateSalary };
