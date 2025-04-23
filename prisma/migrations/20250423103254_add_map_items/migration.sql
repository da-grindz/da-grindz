-- CreateEnum
CREATE TYPE "EateryType" AS ENUM ('RETAIL_DINING', 'RESIDENTIAL_DINING', 'FOOD_TRUCK');

-- CreateEnum
CREATE TYPE "EaterySubtype" AS ENUM ('MEAL_POINTS_ACCEPTED', 'MEAL_POINTS_NOT_ACCEPTED');

-- CreateEnum
CREATE TYPE "VendingType" AS ENUM ('SNACK', 'BEVERAGE');

-- AlterTable
ALTER TABLE "Stuff" ALTER COLUMN "condition" SET DEFAULT 'good';

-- CreateTable
CREATE TABLE "Eatery" (
    "id" SERIAL NOT NULL,
    "keywords" TEXT NOT NULL,
    "type" "EateryType" NOT NULL,
    "subtype" "EaterySubtype" NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "room" TEXT,
    "floor" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT NOT NULL,
    "notes" TEXT,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Eatery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendingMachine" (
    "id" SERIAL NOT NULL,
    "type" "VendingType" NOT NULL,
    "location" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VendingMachine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Eatery_name_key" ON "Eatery"("name");
