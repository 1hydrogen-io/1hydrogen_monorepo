/*
  Warnings:

  - A unique constraint covering the columns `[referralCode]` on the table `wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referralCode` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallet" ADD COLUMN     "joinedCode" TEXT,
ADD COLUMN     "referralCode" TEXT NOT NULL,
ADD COLUMN     "referralPoint" DECIMAL(10,2) NOT NULL DEFAULT 0,
ALTER COLUMN "stakingPoint" SET DEFAULT 0,
ALTER COLUMN "supplyPoint" SET DEFAULT 0,
ALTER COLUMN "point" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "wallet_referralCode_key" ON "wallet"("referralCode");
