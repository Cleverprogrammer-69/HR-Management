import validator from 'validator'
import mongoose from 'mongoose'
import { JobType } from '../models/jobType.models.js'
import { ApiError } from '../utils/ApiError.js'


const jobTypeDataValidator = async (jobTypeCredentials) => {
    if (Object.values(jobTypeCredentials).some(field => {
        return field?.trim() === "" || !field
    })){
        throw new ApiError(400, "All fields must be filled.")
    }
    const existingJobType = await JobType.findOne({
      job_type: jobTypeCredentials.job_type,
    });
    if(existingJobType){
        throw new ApiError(400, "JobType already existed.")
    }
    return true
}

const jobTypeIdValidator = async (jobTypeId) => {
  // check if id is validate mongoose id

  if (!validator.isNumeric(jobTypeId)) {
    throw new ApiError(400, "Invalid jobType Id.");
  }

  // check if we have jobType with that id

  const jobTypeFound = await JobType.findById(jobTypeId);
  if (!jobTypeFound) {
    throw new ApiError(404, "jobType not found by Id.");
  }
  return jobTypeFound;
};

const jobTypeUpdateValidator = async (data) => {
  if (
    Object.values(data).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    throw new ApiError(400, "Changed fields can't be empty.");
  }
};



export {
    jobTypeDataValidator,
    jobTypeIdValidator,
    jobTypeUpdateValidator
}