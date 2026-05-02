import { Request } from "express";
import { fileUploader } from "../../../utils/fileUploader";
import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { ISpecificationCategory } from "./category.interface";

// & CREATE CATEGORY
const createCategoryService = async (req: Request) => {
  const data = JSON.parse(req.body.data) as Category;
  const files = req.files;
  const images = await fileUploader.uploadToCloudinary(
    files as Express.Multer.File[],
  );
  data.slug = data.name.toLowerCase().split(" ").join("-");
  data.image = images[0];

  const result = await prisma.category.create({ data });
  return result;
};

// & GET PARENT CATEGORIES
const getParentCategoriesService = async () => {
  const result = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true,
      categoryToSpecificationSections: {
        include: { specificationSection: true },
      },
    },
  });
  return result;
};

// & GET CATEGORIES
const getAllCategoriesService = async () => {
  const result = await prisma.category.findMany({});
  return result;
};

//& GET SPEC KEY VIA CATEGORY NAME
const getSpecificationViaCategoryIdService = async (id: string) => {
  const result = await prisma.category.findFirst({
    where: { id },
    select: {
      categoryToSpecificationSections: {
        select: {
          specificationSection: {
            select: {
              id: true,
              name: true,
              sectionSpecificationKeys: {
                select: {
                  key: { select: { name: true, id: true, unit: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  return result;
};

//& INSERT SPECIFICATION SECTION TO CATEGORY JOINING TABLE {CategoryToSpecificationSection}
const insertSpecificationSectionTOCategoryService = async (
  payload: ISpecificationCategory,
) => {
  const result = await prisma.categoryToSpecificationSection.createMany({
    data: payload.specificationSectionId.map((speId: string) => ({
      categoryId: payload.categoryId,
      specificationSectionId: speId,
    })),
    skipDuplicates: true,
  });

  return result;
};

export const CategoryService = {
  createCategoryService,
  getParentCategoriesService,
  getAllCategoriesService,
  getSpecificationViaCategoryIdService,
  insertSpecificationSectionTOCategoryService,
};
