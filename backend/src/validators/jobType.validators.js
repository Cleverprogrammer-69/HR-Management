import validator from 'validator'
import { JobType } from '../models/jobType.models.js'
import { ApiError } from '../utils/ApiError.js'

const jobTypeDataValidator = async (jobTypeCredentials) => {
    if (Object.values(jobTypeCredentials).some(field => {
        return field?.trim() === "" || !field
    })){
        throw new ApiError(400, "All fields must be filled")
    }
    const existingJobType = await JobType.findOne({
      job_type: jobTypeCredentials.job_type,
    });
    if(existingJobType){
        throw new ApiError(400, "JobType already existed")
    }
    return true
}

export {
    jobTypeDataValidator
}