/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Eatery` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'VENDOR';

-- AlterTable
ALTER TABLE "Eatery" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "VendorItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "nutrition" TEXT,
    "eateryId" INTEGER NOT NULL,

    CONSTRAINT "VendorItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Eatery_userId_key" ON "Eatery"("userId");

-- AddForeignKey
ALTER TABLE "Eatery" ADD CONSTRAINT "Eatery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorItem" ADD CONSTRAINT "VendorItem_eateryId_fkey" FOREIGN KEY ("eateryId") REFERENCES "Eatery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
