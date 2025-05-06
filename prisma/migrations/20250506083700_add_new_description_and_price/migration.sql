-- CreateTable
CREATE TABLE "PlannerEntry" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "meal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlannerEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlannerEntry" ADD CONSTRAINT "PlannerEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
