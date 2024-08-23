export type Department = {
  _id: number;
  department: string;
};

export type Designation = {
  _id: number;
  designation: string;
};

export type JobType = {
  _id: number;
  job_type: string;
};

export type JobNature = {
  _id: number;
  job_nature: string;
};

export type Employee = {
  _id: number;
  emp_name: string;
  nic: string;
  email: string;
  phone: number;
  prof_qualification: string;
  father: string;
  tech_skill?:string;
  image?:string | '';
  emp_department: Department;
  emp_designation: Designation;
  emp_type: JobType;
  emp_nature: JobNature;
  __v: number;
};

export type EmployeeResponse = {
  statusCode: number;
  data: Employee[];
  message: string;
  success: boolean;
};
