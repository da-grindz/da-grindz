/*
  Warnings:

  - You are about to drop the `_ItemAllergies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemAllergies" DROP CONSTRAINT "_ItemAllergies_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemAllergies" DROP CONSTRAINT "_ItemAllergies_B_fkey";

-- DropTable
DROP TABLE "_ItemAllergies";

-- CreateTable
CREATE TABLE "_DashboardItemAllergies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_VendorItemAllergies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DashboardItemAllergies_AB_unique" ON "_DashboardItemAllergies"("A", "B");

-- CreateIndex
CREATE INDEX "_DashboardItemAllergies_B_index" ON "_DashboardItemAllergies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VendorItemAllergies_AB_unique" ON "_VendorItemAllergies"("A", "B");

-- CreateIndex
CREATE INDEX "_VendorItemAllergies_B_index" ON "_VendorItemAllergies"("B");

-- AddForeignKey
ALTER TABLE "_DashboardItemAllergies" ADD CONSTRAINT "_DashboardItemAllergies_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DashboardItemAllergies" ADD CONSTRAINT "_DashboardItemAllergies_B_fkey" FOREIGN KEY ("B") REFERENCES "DashboardItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VendorItemAllergies" ADD CONSTRAINT "_VendorItemAllergies_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VendorItemAllergies" ADD CONSTRAINT "_VendorItemAllergies_B_fkey" FOREIGN KEY ("B") REFERENCES "VendorItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
