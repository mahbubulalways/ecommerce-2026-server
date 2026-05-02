import { Router } from "express";
import { ENDPOINTS } from "../../endpoints";
import { userController } from "./user.controller";
import VALIDATE_REQUEST from "../../middleware/validateRequest";
import { CREATE_ADMIN_VALIDATION } from "../admin/admin.validate";

const router = Router();
router.post(
  ENDPOINTS.USER.CREATE_EMPLOYEE, // end point
  VALIDATE_REQUEST(CREATE_ADMIN_VALIDATION), // validation
  userController.createAdminController, // controller
);
export default router;
