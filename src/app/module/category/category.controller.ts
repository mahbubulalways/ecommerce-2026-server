import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { ApplicationError } from "../../errors/ApplicationError";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../../utils/sendResponse";

const createCategoryController = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryService(req);
  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "Failed to create Category.",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Category created successfully!",
      statusCode: StatusCodes.OK,
    });
  }
});

// & GET CATEGORIES
const getParentCategoryController = catchAsync(async (req, res) => {
  const result = await CategoryService.getParentCategoriesService();
  if (!result.length) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Category retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

// & GET ALL CATEGORIES
const getAllCategoryController = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoriesService();
  if (!result.length) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Category retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

// & GET ALL CATEGORIES
const getSpecificationViaCategoryIdController = catchAsync(async (req, res) => {
  const result = await CategoryService.getSpecificationViaCategoryIdService(
    req.params.id as string,
  );
  if (!result?.categoryToSpecificationSections.length) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Category specification retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

//& INSERT SPECIFICATION SECTION TO CATEGORY JOINING TABLE {CategoryToSpecificationSection}
const insertSpecificationSectionTOCategoryController = catchAsync(
  async (req, res) => {
    const result =
      await CategoryService.insertSpecificationSectionTOCategoryService(
        req.body,
      );
    if (!result) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Failed to insert specification section to Category.",
      );
    } else {
      sendResponse(res, {
        success: true,
        message: "Insert specification section to category successfully!",
        statusCode: StatusCodes.OK,
      });
    }
  },
);
export const CategoryController = {
  createCategoryController,
  getParentCategoryController,
  getAllCategoryController,
  getSpecificationViaCategoryIdController,
  insertSpecificationSectionTOCategoryController,
};
