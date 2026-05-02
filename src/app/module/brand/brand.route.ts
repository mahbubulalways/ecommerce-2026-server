import { Router } from "express";
import { ENDPOINTS } from "../../endpoints";
import AuthGuard from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";
import { BrandController } from "./brand.controller";
import { fileUploader } from "../../../utils/fileUploader";

const router = Router();

//& CREATE BRAND
router.post(
  ENDPOINTS.BRAND.CREATE_BRAND,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  fileUploader.upload.array("files"),
  BrandController.createBrandController,
);

//& GET BRANDS
router.get(
  ENDPOINTS.BRAND.GET_BRANDS,
  // AuthGuard(USER_ROLE.SUPER_ADMIN),
  BrandController.getBrandSController,
);

// & GET BRANDS FOR INSERT PRODUCT
router.get(
  ENDPOINTS.BRAND.GET_BRANDS_FOR_INSERT_PRODUCT,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  BrandController.getBrandForInsertProductController,
);

export default router;
