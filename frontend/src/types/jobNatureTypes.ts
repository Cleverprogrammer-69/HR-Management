export type JobNature = {
  _id: number;
  job_nature: string;
  description: string;
  __v: number;
}
export type JobNatureResponse = {
  statusCode: number;
  data: JobNature[];
  message: string;
  success: boolean;
}
