// /middlewares/errorHandler.js

import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error(err.stack); 
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred.",
    errors: [],
  });
};

export default errorHandler
