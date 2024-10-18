import { JobNature } from "../models/jobNature.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  jobNatureDataValidator,
  jobNatureIdValidator,
  jobNatureUpdateValidator,
} from "../validators/jobNature.validators.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createJobNature = asyncHandler(async (req, res) => {
  //fetch details
  const { job_nature, description } = req.body;
  //validate the data
  await jobNatureDataValidator({ job_nature, description });
  const jobNature = await JobNature.create({
    job_nature,
    description,
  });
  const newJobNature = await JobNature.findById(jobNature._id);
  if (!newJobNature) {
    throw new ApiError(500, "Something went wrong while creating jobNature.");
  }
  res
    .status(201)
    .json(
      new ApiResponse(201, newJobNature, "Successfully created new JobNature.")
    );
});

const getAllJobNatures = asyncHandler(async (req, res) => {
  // search query for database
  const jobNatures = await JobNature.find().sort({ createdAt: -1 });

  // check if i have res
  if (!jobNatures) {
    throw new ApiError(
      500,
      "Something went wrong while fetching all jobNatures."
    );
  }

  // res
  res
    .status(200)
    .json(
      new ApiResponse(200, jobNatures, "Successfully fetch all jobNatures.")
    );
});

const getOneJobNature = asyncHandler(async (req, res) => {
  // fetch id from params

  const { jobNatureId } = req.params;
  // validate the id
  // find the Nature with id
  const jobNatureFound = await jobNatureIdValidator(jobNatureId);

  // if not fetched throw error
  // if not found throw error
  if (!jobNatureFound) {
    throw new ApiError(500, "Something went wrong while fetching jobNature.");
  }

  // res
  res
    .status(200)
    .json(
      new ApiResponse(200, [jobNatureFound], "JobNature found successfully.")
    );
});

const updateJobNature = asyncHandler(async (req, res) => {
  // Nature id from params validate the id

  const { jobNatureId } = req.params;
  // validate the id
  // find the Nature with id
  const jobNatureFound = await jobNatureIdValidator(jobNatureId);
  // get fields from user
  const data = req.body;
  // validate the fields
  await jobNatureUpdateValidator(data);
  // if Nature id is valid then
  if (!jobNatureFound) {
    throw new ApiError(500, "Something went wrong while fetching jobNature.");
  }
  // update the Nature
  const updatedJobNature = await JobNature.findByIdAndUpdate(
    jobNatureFound._id,
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
      new ApiResponse(200, updatedJobNature, "JobNature updated successfully.")
    );
});

const deleteJobNature = asyncHandler(async (req, res) => {
  //fetch id of Nature
  const { jobNatureId } = req.params;
  // validate the id
  const jobNatureFound = await jobNatureIdValidator(jobNatureId);
  if (!jobNatureFound) {
    throw new ApiError(500, "Something went wrong while fetching jobNature.");
  }
  // delete the doc from db
  const deletedJobNature = await JobNature.findByIdAndDelete(jobNatureId);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedJobNature,
        "Successfully deleted the JobNature."
      )
    );
});

export {
  createJobNature,
  getAllJobNatures,
  getOneJobNature,
  updateJobNature,
  deleteJobNature,
};
