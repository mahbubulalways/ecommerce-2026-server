import { Request } from "express";
import { Brand } from "../../../generated/prisma/client";
import { fileUploader } from "../../../utils/fileUploader";
import { prisma } from "../../../lib/prisma";

// &  CREATE BRAND
const createBrandService = async (req: Request) => {
  const body = JSON.parse(req.body.data) as Brand;
  const files = req.files;
  const images = await fileUploader.uploadToCloudinary(
    files as Express.Multer.File[],
  );
  body.logo = images[0];

  body.slug = body.name.toLowerCase().split(" ").join("-");
  const result = await prisma.brand.create({ data: body });
  return result;
};

//& GET BRAND
const getBrandService = async () => {
  const result = await prisma.brand.findMany({});
  return result;
};

//& GET BRAND FOR INSERT PRODUCT
const getBrandForInsertProductService = async () => {
  const result = await prisma.brand.findMany({
    select: { id: true, name: true },
  });
  return result;
};

export const BrandService = {
  createBrandService,
  getBrandService,
  getBrandForInsertProductService,
};
