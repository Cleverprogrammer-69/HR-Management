import { Department } from "../models/department.models.js";
import validator from 'validator'
import {ApiError} from '../utils/ApiError.js'
import mongoose, { mongo } from "mongoose";



const departmentDataValidator = async (departmentCredentials) => {
    const {department, description, hod, abbrevation} = departmentCredentials
    if (Object.values(departmentCredentials).some(field => {
        return field?.trim() === "" || !field
    })){
        throw new ApiError(400, "All fields must be filled")
    }

    const existingDepartment = await Department.findOne({
        $or:[{ department }, { hod }, { abbrevation }]
    })
    if (existingDepartment){
        throw new ApiError(409, "deparment name or hod or abbrevation is already in use.")
    }

    return true
}

const departmentIdValidator = async (departmentId) => {
    // check if id is validate mongoose id

    if (!validator.isNumeric(departmentId)){
        throw new ApiError(400, "Invalid department Id")
    }

    // check if we have department with that id

    const departmentFound = await Department.findById(departmentId)
    if(!departmentFound){
        throw new ApiError(404, "Department not found by Id")
    }
    return departmentFound
}

const departmentUpdateValidator = async (data) => {
    if (Object.values(data).some(field => {
        return field?.trim() === "" || !field
    })){
        throw new ApiError(400, "Changed fields can't be empty")
    }
}

export {
  departmentDataValidator,
  departmentIdValidator,
  departmentUpdateValidator,
};