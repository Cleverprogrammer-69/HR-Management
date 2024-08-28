import { Designation } from "../models/designation.models.js";
import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import mongoose, { mongo } from "mongoose";

const designationDataValidator = async (designationCredentials) => {
  const { designation, description, abbrevation } = designationCredentials;
  if (
    Object.values(designationCredentials).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    throw new ApiError(400, "All fields must be filled.");
  }

  const existingdesignation = await Designation.findOne({
    $or: [{ designation }, { abbrevation }],
  });
  if (existingdesignation) {
    throw new ApiError(
      409,
      "designation name or abbrevation is already in use."
    );
  }

  return true;
};

const designationIdValidator = async (designationId) => {
  // check if id is validate mongoose id

  if (!validator.isNumeric(designationId)) {
    throw new ApiError(400, "Invalid designation Id.");
  }

  // check if we have designation with that id

  const designationFound = await Designation.findById(designationId);
  if (!designationFound) {
    throw new ApiError(404, "designation not found by Id.");
  }
  return designationFound;
};

const designationUpdateValidator = async (data) => {
  if (
    Object.values(data).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    throw new ApiError(400, "Changed fields can't be empty.");
  }
};

export {
  designationDataValidator,
  designationIdValidator,
  designationUpdateValidator,
};
