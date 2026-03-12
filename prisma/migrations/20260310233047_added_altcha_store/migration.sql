-- CreateTable
CREATE TABLE "UsedAltchaChallenge" (
    "id" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsedAltchaChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsedAltchaChallenge_challenge_key" ON "UsedAltchaChallenge"("challenge");

-- CreateIndex
CREATE INDEX "UsedAltchaChallenge_expiresAt_idx" ON "UsedAltchaChallenge"("expiresAt");
