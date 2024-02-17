/*
  Warnings:

  - Added the required column `point` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallet" ADD COLUMN     "point" INTEGER NOT NULL;
