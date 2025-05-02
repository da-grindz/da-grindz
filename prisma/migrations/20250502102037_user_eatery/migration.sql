/*
  Warnings:

  - You are about to drop the column `description` on the `VendorItem` table. All the data in the column will be lost.
  - You are about to drop the column `nutrition` on the `VendorItem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `VendorItem` table. All the data in the column will be lost.
  - Added the required column `calories` to the `VendorItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbs` to the `VendorItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `VendorItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `VendorItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VendorItem" DROP COLUMN "description",
DROP COLUMN "nutrition",
DROP COLUMN "price",
ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "carbs" INTEGER NOT NULL,
ADD COLUMN     "fat" INTEGER NOT NULL,
ADD COLUMN     "protein" INTEGER NOT NULL;
