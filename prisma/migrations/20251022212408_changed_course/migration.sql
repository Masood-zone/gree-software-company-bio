/*
  Warnings:

  - You are about to drop the column `priceMinor` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "priceMinor",
ADD COLUMN     "amount" DECIMAL(10,2);
