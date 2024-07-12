import { Department } from "../models/department.models.js";
import validator from 'validator'
import {ApiError} from '../utils/ApiError.js'



const departmentRegValidator = async (departmentCredentials) => {
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
        throw new ApiError(409, "deparment name or hod or abbrevation is alread in use.")
    }

    return true
}

export {departmentRegValidator}