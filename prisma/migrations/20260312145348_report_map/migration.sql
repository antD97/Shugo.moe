/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_cubariPostId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_issuerUserId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reportedUserId_fkey";

-- DropTable
DROP TABLE "Report";

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportedUserId" TEXT NOT NULL,
    "issuerUserId" TEXT,
    "cubariPostId" TEXT,
    "reason" TEXT NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "report_issuerUserId_cubariPostId_key" ON "report"("issuerUserId", "cubariPostId");

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_issuerUserId_fkey" FOREIGN KEY ("issuerUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_cubariPostId_fkey" FOREIGN KEY ("cubariPostId") REFERENCES "cubari_post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
