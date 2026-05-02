import { Request } from "express";
import { fileUploader } from "../../../utils/fileUploader";
import { TProductPayload } from "./product.interface";
import { Prisma, Product } from "../../../generated/prisma/client";
import { generateSlug } from "../../../helper/generateSlug";
import { generateSKUFromProductName } from "../../../helper/generateSKUFromProductName";
import { prisma } from "../../../lib/prisma";
import { manageSpecification } from "../../../utils/manageSpecification";

const createProductService = async (req: Request) => {
  const product = JSON.parse(req.body.data) as TProductPayload;
  const files = req.files as {
    thumbnail?: Express.Multer.File[];
    files?: Express.Multer.File[];
  };
  const thumbnail = files?.thumbnail?.[0]!;
  const images = files?.files || [];
  const thumbnailCloud = await fileUploader.uploadToCloudinary([thumbnail]);
  const uploadedThumbnail = thumbnailCloud[0];
  const uploadedImages = await fileUploader.uploadToCloudinary(images);
  product.thumbnail = uploadedThumbnail as string;
  product.images = uploadedImages;
  const productData = {
    name: product.name,
    sku: generateSKUFromProductName(product.name),
    categoryId: product.category,
    brandId: product.brand,
    description: product.description,
    discount: Number(product.discount),
    images: product.images,
    thumbnail: product.thumbnail,
    stock: Number(product.stock),
    price: Number(product.price),
    slug: generateSlug(product.name),
  };

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const newProduct = await tx.product.create({ data: productData });
      await tx.productSpecification.createMany({
        data: product.specification.map((spec) => ({
          productId: newProduct?.id,
          specId: spec.specId,
          sectionId: spec.sectionId,
          value: spec.value,
        })),
      });
      return newProduct;
    },
  );

  return result;
};

//& GET ALL PRODUCTS FOR ADMIN
const getAllProductsForAdminService = async () => {
  const result = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      discount: true,
      slug: true,
      status: true,
      isPublished: true,
      isFeatured: true,
      stock: true,
      thumbnail: true,
      price: true,
      brand: { select: { name: true, id: true, slug: true } },
      // category: { select: { name: true, id: true, slug: true } },
      // productSpecifications: {
      //   select: {
      //     id: true,
      //     value: true,
      //     spec: { select: { name: true, id: true, unit: true } },
      //   },
      // },
    },
  });
  return result;
};

// Section=>key=>value
//& GET  PRODUCT DETAILS FOR ADMIN
const getProductDetailsForAdminService = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: { slug },
    include: {
      brand: true,
      productSpecifications: {
        include: {
          spec: true, // SpecificationKey info
          section: true, // Section info
        },
      },
    },
  });

  if (!product) return null;

  const specifications = manageSpecification(product);
  const { productSpecifications, ...rest } = product;

  const data = {
    ...rest,
    specifications,
  };
  return data;
};

export const ProductService = {
  createProductService,
  getAllProductsForAdminService,
  getProductDetailsForAdminService,
};
