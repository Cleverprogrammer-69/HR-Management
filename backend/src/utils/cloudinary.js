import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export let uploadToCloudinary = (req) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          console.log(result);
          resolve(result);
        } else {
          console.log(error);
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  });
};

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// export const uploadOnCloudinary = async (localFilePath) => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
//   try {
//     console.log(process.env.CLOUDINARY_API_KEY)
//     if (!localFilePath) return null;
//     //upload the file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // file has been uploaded successfull
//     //console.log("file is uploaded on cloudinary ", response.url);
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     fs.unlinkSync(localFilePath); // Remove temporary file
//     //throw new ApiError(500, "Error uploading file: " + error.message); // More specific error message
//   }
// };
