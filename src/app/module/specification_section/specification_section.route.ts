import { Router } from "express";
import { ENDPOINTS } from "../../endpoints";
import { SpecificationSectionController } from "./specification_section.controller";
import AuthGuard from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";

const router = Router();

//& CREATE SPECIFICATION SECTION
router.post(
  ENDPOINTS.SPECIFICATION_SECTION.CREATE_SPECIFICATION_SECTION,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  SpecificationSectionController.createSpecificationSectionController,
);

//& INSERT SPECIFICATION KEYS TO SPECIFICATION SECTION JOINING TABLE {SectionSpecificationKey}
router.post(
  ENDPOINTS.SPECIFICATION_SECTION.INSERT_SPECIFICATION_KEY_TO_SECTION,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  SpecificationSectionController.insertSpecificationKeyToSpecificationSectionController,
);

// & GET SPECIFICATION
router.get(
  ENDPOINTS.SPECIFICATION_SECTION.GET_SPECIFICATION_SECTIONS,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  SpecificationSectionController.getSpecificationSectionController,
);

//& GET SPECIFICATION SECTION FOR CATEGORY. LABEL AND VALUE PAIR
router.get(
  ENDPOINTS.SPECIFICATION_SECTION.GET_SPECIFICATION_SECTION_FOR_CATEGORY,
  AuthGuard(USER_ROLE.SUPER_ADMIN),
  SpecificationSectionController.getSpecificationSectionForCategoryController,
);

export default router;
