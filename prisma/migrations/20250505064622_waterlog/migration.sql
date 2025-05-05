-- AlterTable
ALTER TABLE "_DashboardItemAllergies" ADD CONSTRAINT "_DashboardItemAllergies_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DashboardItemAllergies_AB_unique";

-- AlterTable
ALTER TABLE "_UserAllergies" ADD CONSTRAINT "_UserAllergies_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserAllergies_AB_unique";

-- AlterTable
ALTER TABLE "_VendorItemAllergies" ADD CONSTRAINT "_VendorItemAllergies_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_VendorItemAllergies_AB_unique";

-- CreateTable
CREATE TABLE "WaterLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WaterLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaterLog_userId_date_key" ON "WaterLog"("userId", "date");

-- AddForeignKey
ALTER TABLE "WaterLog" ADD CONSTRAINT "WaterLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
