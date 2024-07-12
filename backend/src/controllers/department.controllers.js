import { Department } from "../models/department.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { departmentRegValidator } from "../validators/department.validators.js";

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

export { registerDepartment };