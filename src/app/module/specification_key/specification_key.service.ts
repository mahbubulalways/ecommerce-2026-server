import { StatusCodes } from "http-status-codes";
import { SpecificationKey } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { ApplicationError } from "../../errors/ApplicationError";
import { ICategorySpec } from "./specification_key.interface";

// & CREATE SPECIFICATION  KEY
const createSpecificationKeyService = async (payload: SpecificationKey) => {
  const isExist = await prisma.specificationKey.count({
    where: { name: payload.name, unit: payload.unit },
  });
  if (isExist) {
    throw new ApplicationError(
      StatusCodes.CONFLICT,
      "This Specification is already exist.",
    );
  }
  const result = await prisma.specificationKey.create({ data: payload });
  return result;
};

//& GET SPECIFICATION KEY
const getSpecificationKeyService = async () => {
  const result = await prisma.specificationKey.findMany({
    orderBy: { name: "asc" },
    // include: {
    //   categorySpecifications: {
    //     include: { category: { select: { name: true, slug: true } } },
    //   },
    // },
  });
  return result;
};

//& GET SPECIFICATION KEY FOR ADD TO SPECIFICATION SECTION
const getSpecificationKeyForSectionService = async () => {
  const result = await prisma.specificationKey.findMany({
    select: { name: true, id: true },
  });
  return result;
};

export const SpecificationKeyService = {
  createSpecificationKeyService,
  getSpecificationKeyService,
  getSpecificationKeyForSectionService,
};
