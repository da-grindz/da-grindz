-- AlterTable
ALTER TABLE "Stuff" ALTER COLUMN "condition" SET DEFAULT 'good';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "grindzMoodId" INTEGER;

-- CreateTable
CREATE TABLE "Allergy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "nutrition" TEXT NOT NULL,
    "moodId" INTEGER NOT NULL,

    CONSTRAINT "DashboardItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserAllergies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemAllergies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Allergy_name_key" ON "Allergy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mood_name_key" ON "Mood"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserAllergies_AB_unique" ON "_UserAllergies"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAllergies_B_index" ON "_UserAllergies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemAllergies_AB_unique" ON "_ItemAllergies"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemAllergies_B_index" ON "_ItemAllergies"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_grindzMoodId_fkey" FOREIGN KEY ("grindzMoodId") REFERENCES "Mood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardItem" ADD CONSTRAINT "DashboardItem_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAllergies" ADD CONSTRAINT "_UserAllergies_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAllergies" ADD CONSTRAINT "_UserAllergies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemAllergies" ADD CONSTRAINT "_ItemAllergies_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemAllergies" ADD CONSTRAINT "_ItemAllergies_B_fkey" FOREIGN KEY ("B") REFERENCES "DashboardItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
