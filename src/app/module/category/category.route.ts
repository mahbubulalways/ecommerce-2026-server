import { Router } from "express";
import { ENDPOINTS } from "../../endpoints";
import { fileUploader } from "../../../utils/fileUploader";
import { CategoryController } from "./category.controller";
import AuthGuard from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";

const router = Router();

// & CREATE CATEGORY
router.post(
  ENDPOINTS.CATEGORY.CREATE_CATEGORY,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  fileUploader.upload.array("files"),
  CategoryController.createCategoryController,
);

//& INSERT SPECIFICATION SECTION TO CATEGORY JOINING TABLE {CategoryToSpecificationSection}
router.post(
  ENDPOINTS.CATEGORY.INSERT_SPECIFICATION_SECTION_TO_CATEGORY,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  CategoryController.insertSpecificationSectionTOCategoryController,
);

// & GET PARENT CATEGORIES
router.get(
  ENDPOINTS.CATEGORY.GET_PARENT_CATEGORY,
  CategoryController.getParentCategoryController,
);

// & GET ALL CATEGORIES
router.get(
  ENDPOINTS.CATEGORY.GET_ALL_CATEGORY,
  CategoryController.getAllCategoryController,
);

// & GET SPECIFICATION KEY VIA CATEGORY ID
router.get(
  ENDPOINTS.CATEGORY.SPECIFICATION,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  CategoryController.getSpecificationViaCategoryIdController,
);

export default router;
