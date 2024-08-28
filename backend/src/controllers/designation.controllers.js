import { Designation } from "../models/designation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  designationDataValidator,
  designationIdValidator,
  designationUpdateValidator,
} from "../validators/designation.validators.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createDesignation = asyncHandler(async (req, res) => {
  //fetch details
  const { designation, description, abbrevation } = req.body;
  //validate the data
  await designationDataValidator({ designation, description, abbrevation });
  const newDesignation = await Designation.create({
    designation,
    description,
    abbrevation
  });
  const createdDesignation = await Designation.findById(newDesignation._id);
  if (!createdDesignation) {
    throw new ApiError(500, "Something went wrong while creating Designation.");
  }
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdDesignation,
        "Successfully created new Designation."
      )
    );
});

const getAllDesignations = asyncHandler(async (req, res) => {
  // search query for database
  const designations = await Designation.find().sort({ createdAt: -1 });

  // check if i have res
  if (!designations) {
    throw new ApiError(
      500,
      "Something went wrong while fetching all Designations."
    );
  }

  // res
  res
    .status(200)
    .json(
      new ApiResponse(200, designations, "Successfully fetch all Designations.")
    );
});

const getOneDesignation = asyncHandler(async (req, res) => {
  // fetch id from params

  const { designationId } = req.params;
  // validate the id
  // find the Nature with id
  const designationFound = await designationIdValidator(designationId);

  // if not fetched throw error
  // if not found throw error
  if (!designationFound) {
    throw new ApiError(500, "Something went wrong while fetching Designation.");
  }

  // res
  res
    .status(200)
    .json(new ApiResponse(200, [designationFound], "Designation found successfully."));
});

const updateDesignation = asyncHandler(async (req, res) => {
  // Nature id from params validate the id

  const { designationId } = req.params;
  // validate the id
  // find the Nature with id
  const designationFound = await designationIdValidator(designationId);
  // get fields from user
  const data = req.body;
  // validate the fields
  await designationUpdateValidator(data);
  // if Nature id is valid then
  if (!designationFound) {
    throw new ApiError(500, "Something went wrong while fetching Designation.");
  }
  // update the Nature
  const updatedDesignation = await Designation.findByIdAndUpdate(
    designationFound._id,
    {
      ...data,
    },
    {
      new: true,
    }
  );
  // res
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedDesignation, "Designation updated successfully.")
    );
});

const deleteDesignation = asyncHandler(async (req, res) => {
  //fetch id of Nature
  const { designationId } = req.params;
  // validate the id
  const designationFound = await designationIdValidator(designationId);
  if (!designationFound) {
    throw new ApiError(500, "Something went wrong while fetching Designation.");
  }
  // delete the doc from db
  const deletedDesignation = await Designation.findByIdAndDelete(designationId);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedDesignation,
        "Successfully deleted the Designation."
      )
    );
});

export {
  createDesignation,
  getAllDesignations,
  getOneDesignation,
  updateDesignation,
  deleteDesignation,
};
