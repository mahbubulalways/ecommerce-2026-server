/*
  Warnings:

  - You are about to drop the `categorySpecifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specificationKeys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categorySpecifications" DROP CONSTRAINT "categorySpecifications_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "categorySpecifications" DROP CONSTRAINT "categorySpecifications_specId_fkey";

-- DropForeignKey
ALTER TABLE "productSpecifications" DROP CONSTRAINT "productSpecifications_specId_fkey";

-- DropTable
DROP TABLE "categorySpecifications";

-- DropTable
DROP TABLE "specificationKeys";

-- CreateTable
CREATE TABLE "SpecificationSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecificationSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryToSpecificationSection" (
    "categoryId" TEXT NOT NULL,
    "specificationSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryToSpecificationSection_pkey" PRIMARY KEY ("categoryId","specificationSectionId")
);

-- CreateTable
CREATE TABLE "SpecificationKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "unit" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecificationKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionSpecificationKey" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "keyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionSpecificationKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttributeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAttributeValue" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionSpecificationKey_sectionId_keyId_key" ON "SectionSpecificationKey"("sectionId", "keyId");

-- AddForeignKey
ALTER TABLE "CategoryToSpecificationSection" ADD CONSTRAINT "CategoryToSpecificationSection_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToSpecificationSection" ADD CONSTRAINT "CategoryToSpecificationSection_specificationSectionId_fkey" FOREIGN KEY ("specificationSectionId") REFERENCES "SpecificationSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionSpecificationKey" ADD CONSTRAINT "SectionSpecificationKey_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SpecificationSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionSpecificationKey" ADD CONSTRAINT "SectionSpecificationKey_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "SpecificationKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSpecifications" ADD CONSTRAINT "productSpecifications_specId_fkey" FOREIGN KEY ("specId") REFERENCES "SpecificationKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "AttributeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
