export type Designation = {
  _id: number;
  designation: string;
  description: string;
  abbrevation: string;
  __v: number;
}

export type DesignationResponse = {
  statusCode: number;
  data: Designation[];
  message: string;
  success: boolean;
}
