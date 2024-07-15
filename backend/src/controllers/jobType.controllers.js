import { JobType } from "../models/jobType.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { jobTypeDataValidator, jobTypeIdValidator, jobTypeUpdateValidator } from "../validators/jobType.validators.js";
import { ApiResponse } from '../utils/ApiResponse.js'


const createJobType = asyncHandler( async (req, res) => {
    //fetch details 
    const { job_type, description } = req.body;
    //validate the data
    await jobTypeDataValidator({job_type, description})
    const jobType = await JobType.create({
        job_type,
        description
    })
    const newJobType = await JobType.findById(jobType._id)
    if(!newJobType){
        throw new ApiError(500, "Something went wrong while creating jobType")
    }
    res
    .status(201)
    .json(
        new ApiResponse(201, newJobType, "Successfully created new JobType")
    )
})

const getAllJobTypes = asyncHandler(async (req, res) => {
  // search query for database
  const jobTypes = await JobType.find().sort({ createdAt: -1 });

  // check if i have res
  if (!jobTypes) {
    throw new ApiError(
      500,
      "Something went wrong while fetching all jobTypes"
    );
  }

  // res
  res
    .status(200)
    .json(
      new ApiResponse(200, jobTypes, "Successfully fetch all jobTypes")
    );
});

const getOneJobType = asyncHandler(async (req, res) => {
  // fetch id from params

  const { jobTypeId } = req.params;
  // validate the id
  // find the department with id
  const jobTypeFound = await jobTypeIdValidator(jobTypeId);

  // if not fetched throw error
  // if not found throw error
  if (!jobTypeFound) {
    throw new ApiError(500, "Something went wrong while fetching jobType");
  }

  // res
  res
    .status(200)
    .json(new ApiResponse(200, jobTypeFound, "JobType found successfully"));
});

const updateJobType = asyncHandler(async (req, res) => {
  // department id from params validate the id

  const { jobTypeId } = req.params;
  // validate the id
  // find the department with id
  const jobTypeFound = await jobTypeIdValidator(jobTypeId);
  // get fields from user
  const data = req.body;
  // validate the fields
  await jobTypeUpdateValidator(data);
  // if department id is valid then
  if (!jobTypeFound) {
    throw new ApiError(500, "Something went wrong while fetching jobType");
  }
  // update the department
  const updatedJobType = await JobType.findByIdAndUpdate(
    jobTypeFound._id,
    {
      ...data,
    },
    {
      new: true,
    }
  );
  // res
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedJobType,
        "JobType updated successfully"
      )
    );
});

const deleteJobType = asyncHandler(async (req, res) => {
  //fetch id of department
  const { jobTypeId } = req.params;
  // validate the id
  const jobTypeFound = await jobTypeIdValidator(jobTypeId);
  if (!jobTypeFound) {
    throw new ApiError(500, "Something went wrong while fetching jobType");
  }
  // delete the doc from db
  const deletedJobType = await JobType.findByIdAndDelete(jobTypeId);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedJobType,
        "Successfully deleted the JobType"
      )
    );
});


export {
    createJobType,
    getAllJobTypes,
    getOneJobType,
    updateJobType,
    deleteJobType
}