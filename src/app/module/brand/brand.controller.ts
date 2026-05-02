import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { ApplicationError } from "../../errors/ApplicationError";
import { BrandService } from "./brand.service";
import { sendResponse } from "../../../utils/sendResponse";

const createBrandController = catchAsync(async (req, res) => {
  const result = await BrandService.createBrandService(req);
  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "Failed to create Brand.",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Brand created successfully!",
      statusCode: StatusCodes.OK,
    });
  }
});

// & GET CATEGORIES
const getBrandSController = catchAsync(async (req, res) => {
  const result = await BrandService.getBrandService();
  if (!result.length) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieved brands!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Brands retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

// & GET BRANDS FOR INSERT PRODUCT
const getBrandForInsertProductController = catchAsync(async (req, res) => {
  const result = await BrandService.getBrandForInsertProductService();
  if (!result.length) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieved brands!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Brands retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

export const BrandController = {
  getBrandSController,
  createBrandController,
  getBrandForInsertProductController,
};
