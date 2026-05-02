/*
  Warnings:

  - Added the required column `sectionId` to the `productSpecifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productSpecifications" ADD COLUMN     "sectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "productSpecifications" ADD CONSTRAINT "productSpecifications_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SpecificationSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
