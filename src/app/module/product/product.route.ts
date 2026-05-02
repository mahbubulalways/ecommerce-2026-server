import { Router } from "express";
import { ENDPOINTS } from "../../endpoints";
import AuthGuard from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";
import { ProductController } from "./product.controller";
import { fileUploader } from "../../../utils/fileUploader";

const router = Router();

//& CREATE PRODUCT
router.post(
  ENDPOINTS.PRODUCT.CREATE_PRODUCT,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  fileUploader.upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "files", maxCount: 5 },
  ]),
  ProductController.createProductController,
);

//& GET ALL PRODUCTS FOR ADMIN
router.get(
  ENDPOINTS.PRODUCT.GET_PRODUCTS_FOR_ADMIN,
  // AuthGuard(USER_ROLE.SUPER_ADMIN),
  ProductController.getAllProductsForAdminController,
);

//& GET  PRODUCT DETAILS FOR ADMIN
router.get(
  ENDPOINTS.PRODUCT.GET_PRODUCT_DETAILS_FOR_ADMIN,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  ProductController.getProductDetailsForAdminController,
);

router.get("/delete", ProductController.deleteProduct);

export default router;
