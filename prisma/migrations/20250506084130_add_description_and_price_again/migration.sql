-- AlterTable
ALTER TABLE "VendorItem" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No description provided',
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
