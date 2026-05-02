import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import fs from "fs";
import { ICloudinaryResponse, IUploadFile } from "../interface/file";

cloudinary.config({
  cloud_name: "dt4kwpzfk",
  api_key: "881498193527174",
  api_secret: "rO8e7-cw179mOfgrTBI8ZJYR70Q",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const uploadToCloudinary = async (files: IUploadFile[]) => {
  // : Promise<ICloudinaryResponse[]>
  const images: string[] = [];
  const uploadPromises = files.map((file) => {
    return new Promise<ICloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result as unknown as ICloudinaryResponse);
        }
      });
    });
  });

  const uploadedImages = Promise.all(uploadPromises);
  (await uploadedImages).map((image) => {
    images.push(image.secure_url);
  });
  return images;
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
