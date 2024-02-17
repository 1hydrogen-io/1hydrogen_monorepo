/*
  Warnings:

  - You are about to alter the column `stakingPoint` on the `wallet` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `supplyPoint` on the `wallet` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `point` on the `wallet` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "wallet" ALTER COLUMN "stakingPoint" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "supplyPoint" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "point" SET DATA TYPE DECIMAL(10,2);
