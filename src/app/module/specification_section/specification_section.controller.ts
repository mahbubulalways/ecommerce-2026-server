import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { ApplicationError } from "../../errors/ApplicationError";
import { SpecificationSectionService } from "./specification_section.service";
import { sendResponse } from "../../../utils/sendResponse";

//& CREATE SPECIFICATION SECTION
const createSpecificationSectionController = catchAsync(async (req, res) => {
  const result =
    await SpecificationSectionService.createSpecificationSectionService(
      req.body,
    );
  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "Failed to create specification section.",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Specification section created successfully!",
      statusCode: StatusCodes.OK,
    });
  }
});

//& GET SPECIFICATION SECTION
const getSpecificationSectionController = catchAsync(async (req, res) => {
  const result =
    await SpecificationSectionService.getSpecificationSectionService();
  if (!result) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieve specification section.",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Specification section retrieve successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

//& INSERT SPECIFICATION KEYS TO SPECIFICATION SECTION JOINING TABLE {SectionSpecificationKey}
const insertSpecificationKeyToSpecificationSectionController = catchAsync(
  async (req, res) => {
    const result =
      await SpecificationSectionService.insertSpecificationKeyToSpecificationSectionService(
        req.body,
      );
    if (!result) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Failed to insert specification key to specification section.",
      );
    } else {
      sendResponse(res, {
        success: true,
        message:
          "Insert specification key to specification section. successfully!",
        statusCode: StatusCodes.OK,
        data: result,
      });
    }
  },
);

//& GET SPECIFICATION SECTION FOR CATEGORY. LABEL AND VALUE PAIR
const getSpecificationSectionForCategoryController = catchAsync(
  async (req, res) => {
    const result =
      await SpecificationSectionService.getSpecificationSectionForCategoryService();
    if (!result) {
      sendResponse(res, {
        success: true,
        message: "Failed to retrieve specification section.",
        statusCode: StatusCodes.OK,
        data: [],
      });
    } else {
      sendResponse(res, {
        success: true,
        message: "Specification section retrieve successfully!",
        statusCode: StatusCodes.OK,
        data: result,
      });
    }
  },
);
export const SpecificationSectionController = {
  createSpecificationSectionController,
  getSpecificationSectionController,
  insertSpecificationKeyToSpecificationSectionController,
  getSpecificationSectionForCategoryController,
};
