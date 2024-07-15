import { JobType } from "../models/jobType.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { jobTypeDataValidator } from "../validators/jobType.validators.js";
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

export {
    createJobType
}