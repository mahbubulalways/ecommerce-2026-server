import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { ApplicationError } from "../../errors/ApplicationError";
import { ProductService } from "./product.service";
import { prisma } from "../../../lib/prisma";

//& CREATE PRODUCT
const createProductController = catchAsync(async (req, res) => {
  const result = await ProductService.createProductService(req);
  if (!result) {
    throw new ApplicationError(
      StatusCodes.BAD_REQUEST,
      "Failed to create product.",
    );
  } else {
    sendResponse(res, {
      success: true,
      message: "Product created successfully!",
      statusCode: StatusCodes.OK,
    });
  }
});

//& GET ALL PRODUCTS FOR ADMIN
const getAllProductsForAdminController = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductsForAdminService();
  if (!result.length) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieved products!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Products retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

//& GET  PRODUCT DETAILS FOR ADMIN
const getProductDetailsForAdminController = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const result = await ProductService.getProductDetailsForAdminService(
    slug as string,
  );
  if (!result?.id) {
    sendResponse(res, {
      success: true,
      message: "Failed to retrieved product!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Product retrieved successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    tx.productSpecification.deleteMany();
    return tx.product.deleteMany();
  });

  if (!result?.count) {
    sendResponse(res, {
      success: true,
      message: "Failed to deleted product!",
      statusCode: StatusCodes.OK,
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Product deleted successfully!",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
});

export const ProductController = {
  createProductController,
  getAllProductsForAdminController,
  getProductDetailsForAdminController,
  deleteProduct,
};
