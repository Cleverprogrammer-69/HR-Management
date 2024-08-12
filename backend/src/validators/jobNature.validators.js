import validator from "validator";
import mongoose from "mongoose";
import { JobNature } from "../models/jobNature.models.js";
import { ApiError } from "../utils/ApiError.js";

const jobNatureDataValidator = async (jobNatureCredentials) => {
  if (
    Object.values(jobNatureCredentials).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    throw new ApiError(400, "All fields must be filled");
  }
  const existingJobnature = await JobNature.findOne({
    job_nature: jobNatureCredentials.job_nature,
  });
  if (existingJobnature) {
    throw new ApiError(400, "Jobnature already existed");
  }
  return true;
};

const jobNatureIdValidator = async (jobNatureId) => {
  // check if id is validate mongoose id

  if (!validator.isNumeric(jobNatureId)) {
    throw new ApiError(400, "Invalid jobnature Id");
  }

  // check if we have jobnature with that id

  const jobNatureFound = await JobNature.findById(jobNatureId);
  if (!jobNatureFound) {
    throw new ApiError(404, "jobnature not found by Id");
  }
  return jobNatureFound;
};

const jobNatureUpdateValidator = async (data) => {
  if (
    Object.values(data).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    throw new ApiError(400, "Changed fields can't be empty");
  }
};

export { jobNatureDataValidator, jobNatureIdValidator, jobNatureUpdateValidator };
