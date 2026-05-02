import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { ApplicationError } from "../../errors/ApplicationError";
import { SpecificationKeyService } from "./specification_key.service";
import { sendResponse } from "../../../utils/sendResponse";

//& CREATE SPECIFICATION KEY
const createSpecificationKeyController = catchAsync(async (req, res) => {
  const result = await SpecificationKeyService.createSpecificationKeyService(
    req.body,
  );
  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "Failed to create specification.",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Specification created successfully!",
      statusCode: StatusCodes.OK,
    });
  }
});

//& GET SPECIFICATION KEY
const getSpecificationKeyController = catchAsync(async (req, res) => {
  const result = await SpecificationKeyService.getSpecificationKeyService();
  if (!result) {
    sendResponse(res, {
      success: true,
      message: "Failed to create specification.",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Specification created successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

//& GET SPECIFICATION KEY FOR ADD TO SPECIFICATION SECTION
const getSpecificationKeyForSectionController = catchAsync(async (req, res) => {
  const result =
    await SpecificationKeyService.getSpecificationKeyForSectionService();
  if (!result.length) {
    sendResponse(res, {
      success: true,
      message: "Failed to find specification keys.",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Specification keys find successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});
export const SpecificationKeyController = {
  createSpecificationKeyController,
  getSpecificationKeyController,
  getSpecificationKeyForSectionController,
};
