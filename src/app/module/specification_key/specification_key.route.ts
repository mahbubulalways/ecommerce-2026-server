import e, { Router } from "express";
import { ENDPOINTS } from "../../endpoints";
import AuthGuard from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";
import VALIDATE_REQUEST from "../../middleware/validateRequest";
import { SPECIFICATION_KEY_VALIDATION } from "./specification_key.validation";
import { SpecificationKeyController } from "./specification_key.controller";

const router = Router();

//& CREATE SPECIFICATION KEY
router.post(
  ENDPOINTS.SPECIFICATION_KEY.CREATE_SPECIFICATION_KEY,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  VALIDATE_REQUEST(SPECIFICATION_KEY_VALIDATION),
  SpecificationKeyController.createSpecificationKeyController,
);

//& GET SPECIFICATION KEY iSSUE
router.get(
  ENDPOINTS.SPECIFICATION_KEY.GET_SPECIFICATION_KEYS,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  SpecificationKeyController.getSpecificationKeyController,
);

//& GET SPECIFICATION KEY FOR ADD TO SPECIFICATION SECTION
router.get(
  ENDPOINTS.SPECIFICATION_KEY.GET_SPECIFICATION_KEY_FOR_SECTION,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  SpecificationKeyController.getSpecificationKeyForSectionController,
);

export default router;
