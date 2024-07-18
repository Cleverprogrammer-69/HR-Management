import { Employee } from "../models/employee.models.js";
import mongoose from "mongoose";
import validator from "validator";
import {asyncHandler } from '../utils/asyncHandler.js'
import { employeeDataValidator, employeeIdValidator } from "../validators/employee.validators.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const createEmployee = asyncHandler( async (req,res) => {
    //fetch details
    const {
      emp_name,
      email,
      nic,
      phone,
      prof_qualification,
      father,
      emp_department,
      emp_designation,
      emp_type,
      emp_nature,
      tech_skill,
    } = req.body;
    //validate the details => also check if employee is existed before or not 
    await employeeDataValidator({
      emp_name,
      phone,
      nic,
    //   email: email && email,
      prof_qualification,
      father,
      emp_department,
      emp_designation,
      emp_type,
      emp_nature,
    });
    if(email){
        if(!validator.isEmail(email)){
            throw new ApiError(400, "Invalid email")
        }
        const emailFound = await Employee.findOne({email: email})
        if(emailFound){
            throw new ApiError(400, "Entered email is already in use")
        }
    }

    if(tech_skill?.trim() === ''){
        throw new ApiError(400, "Entered tech_skill is empty")
    }

    let image;

    if (req.file?.buffer) {
        image = await uploadToCloudinary(req);
        if (!image) {
            throw new ApiError(400, "Error uploading to Cloudinary");
        }
    }

    const newEmployee = await Employee.create({
      emp_name,
      phone,
      nic,
      email: email && email,
      prof_qualification,
      tech_skill: tech_skill && tech_skill,
      father,
      image: image?.secure_url,
      emp_department,
      emp_designation,
      emp_type,
      emp_nature,
    });

    const createdEmployee = await Employee.findById(newEmployee._id)
    if(!createdEmployee){
        throw new ApiError(500, "Something went wrong while creating employee"+createdEmployee)
    }
    res.status(201).json(
        new ApiResponse(201, createdEmployee, "Employee created successfully")
    )
})

const getAllEmployees = asyncHandler( async (_, res) => {
    const employees = await Employee.find().populate("emp_department").sort({createdAt: -1})
    if(!employees){
        throw new ApiError(500, "Something went wrong while fetching all employees")
    }
    res
    .status(200)
    .json(
        new ApiResponse(200, employees, "Fetch all Employees successfully")
    )
})

const getOneEmployee = asyncHandler( async(req, res) => {
    const { employeeId } = req.params
    const employee = await employeeIdValidator(employeeId)
    if(!employee){
        throw new ApiError(500, "something went wrong while fetch employee")
    }
    res
    .status(200)
    .json(
        new ApiResponse(200, employee, "Employee fetched successfully")
    )
})

export { createEmployee, getAllEmployees, getOneEmployee }