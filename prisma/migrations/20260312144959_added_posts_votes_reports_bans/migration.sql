/*
  Warnings:

  - You are about to drop the `UsedAltchaChallenge` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UP_VOTE', 'DOWN_VOTE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "usernameUpdatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "UsedAltchaChallenge";

-- CreateTable
CREATE TABLE "cubari_post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aliases" TEXT[],
    "author" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "userId" TEXT,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "cubari_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cubariPostId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("cubariPostId","userId")
);

-- CreateTable
CREATE TABLE "ban" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "bannedUserId" TEXT NOT NULL,
    "issuerUserId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "ban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportedUserId" TEXT NOT NULL,
    "issuerUserId" TEXT,
    "cubariPostId" TEXT,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "used_altcha_challenge" (
    "id" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "challenge" TEXT NOT NULL,

    CONSTRAINT "used_altcha_challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cubari_post_url_key" ON "cubari_post"("url");

-- CreateIndex
CREATE INDEX "cubari_post_createdAt_idx" ON "cubari_post"("createdAt");

-- CreateIndex
CREATE INDEX "cubari_post_userId_idx" ON "cubari_post"("userId");

-- CreateIndex
CREATE INDEX "cubari_post_tags_idx" ON "cubari_post" USING GIN ("tags");

-- CreateIndex
CREATE INDEX "vote_userId_idx" ON "vote"("userId");

-- CreateIndex
CREATE INDEX "ban_bannedUserId_idx" ON "ban"("bannedUserId");

-- CreateIndex
CREATE INDEX "ban_issuerUserId_idx" ON "ban"("issuerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_issuerUserId_cubariPostId_key" ON "Report"("issuerUserId", "cubariPostId");

-- CreateIndex
CREATE UNIQUE INDEX "used_altcha_challenge_challenge_key" ON "used_altcha_challenge"("challenge");

-- CreateIndex
CREATE INDEX "used_altcha_challenge_expiresAt_idx" ON "used_altcha_challenge"("expiresAt");

-- CreateIndex
CREATE INDEX "verification_expiresAt_idx" ON "verification"("expiresAt");

-- AddForeignKey
ALTER TABLE "cubari_post" ADD CONSTRAINT "cubari_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_cubariPostId_fkey" FOREIGN KEY ("cubariPostId") REFERENCES "cubari_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ban" ADD CONSTRAINT "ban_bannedUserId_fkey" FOREIGN KEY ("bannedUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ban" ADD CONSTRAINT "ban_issuerUserId_fkey" FOREIGN KEY ("issuerUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_issuerUserId_fkey" FOREIGN KEY ("issuerUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_cubariPostId_fkey" FOREIGN KEY ("cubariPostId") REFERENCES "cubari_post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
