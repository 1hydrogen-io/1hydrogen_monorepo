/*
  Warnings:

  - You are about to drop the column `point` on the `wallet` table. All the data in the column will be lost.
  - Added the required column `stakingPoint` to the `wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplyPoint` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallet" DROP COLUMN "point",
ADD COLUMN     "stakingPoint" INTEGER NOT NULL,
ADD COLUMN     "supplyPoint" INTEGER NOT NULL;
