export type JobType = {
    _id: number,
    job_type: string,
    description: string,
    __v: number
}

export type JobTypeResponse = {
    statusCode: number,
    data: JobType[],
    message: string,
    success: boolean
}
