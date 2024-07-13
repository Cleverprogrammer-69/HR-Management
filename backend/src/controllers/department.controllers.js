import { Department } from "../models/department.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { departmentIdValidator, departmentRegValidator } from "../validators/department.validators.js";

const registerDepartment = asyncHandler( async (req, res) => {
    //fetch details from form

    const { department, description, hod, abbrevation, is_active } = req.body
    //validate the info

    await departmentRegValidator({department, description, hod, abbrevation})
    //insert new doc in db

    const newDepartment = await Department.create({
        department,
        description,
        hod,
        abbrevation,
        is_active: is_active === false ? false : true
    })

    const createdDepartment = await Department.findById(newDepartment._id)

    if(!createdDepartment){
        throw new ApiError(500, "Something went wrong while creating department")
    }
    //res

    res
    .status(201)
    .json(
        new ApiResponse(201, newDepartment, "Successfully created new department")
    )
})

const getAllDepartments = asyncHandler(async(req,res)=>{
    // search query for database
    const departments = await Department.find().sort({createdAt: -1})

    // check if i have res
    if(!departments){
        throw new ApiError(500, "Something went wrong while fetching all departments")
    }

    // res
    res.status(200)
    .json(
        new ApiResponse(200, departments, "Successfully fetch all departments")
    )
})

const getOneDepartment = asyncHandler( async (req, res) => {
    // fetch id from params

    const { departmentId } = req.params;
    // validate the id
    // find the department with id
    const departmentFound = await departmentIdValidator(departmentId)
    
    // if not fetched throw error
    // if not found throw error
    if (!departmentFound){
        throw new ApiError(500, "Something went wrong while fetching department")
    }
    
    // res
    res
    .status(200)
    .json(
        new ApiResponse(200, departmentFound, "Department found successfully")
    )
})

export { registerDepartment, getAllDepartments, getOneDepartment };