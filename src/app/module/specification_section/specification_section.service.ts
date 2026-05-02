import { SpecificationSection } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { ISpecificationSectionAndKey } from "./specification_section.interface";

// & CREATE SPECIFICATION SECTION
const createSpecificationSectionService = async (
  payload: SpecificationSection,
) => {
  const result = await prisma.specificationSection.create({ data: payload });
  return result;
};

// & GET SPECIFICATION
const getSpecificationSectionService = async () => {
  const result = await prisma.specificationSection.findMany({
    include: {
      sectionSpecificationKeys: {
        select: { key: { select: { name: true, id: true, unit: true } } },
      },
    },
  });
  return result;
};

//& INSERT SPECIFICATION KEYS TO SPECIFICATION SECTION JOINING TABLE {SectionSpecificationKey}
const insertSpecificationKeyToSpecificationSectionService = async (
  payload: ISpecificationSectionAndKey,
) => {
  const result = await prisma.sectionSpecificationKey.createMany({
    data: payload.keyId.map((key) => ({
      keyId: key,
      sectionId: payload.sectionId,
    })),
    skipDuplicates: true,
  });

  return result;
};

//& GET SPECIFICATION SECTION FOR CATEGORY. LABEL AND VALUE PAIR
const getSpecificationSectionForCategoryService = async () => {
  const result = await prisma.specificationSection.findMany({
    select: { name: true, id: true },
  });
  return result;
};

export const SpecificationSectionService = {
  createSpecificationSectionService,
  getSpecificationSectionService,
  insertSpecificationKeyToSpecificationSectionService,
  getSpecificationSectionForCategoryService,
};
