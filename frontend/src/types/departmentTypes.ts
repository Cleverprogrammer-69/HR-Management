export type Department = {
  _id: number;
  department: string;
  description: string;
  hod: string;
  abbrevation: string;
  is_active: boolean;
  __v: number;
}

export type DepartmentResponse = {
  statusCode: number;
  data: Department[];
  message: string;
  success: boolean;
}
