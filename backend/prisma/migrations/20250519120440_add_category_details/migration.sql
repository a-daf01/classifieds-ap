/*
  Warnings:

  - You are about to drop the column `deadline` on the `ProjectDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectDetail" DROP COLUMN "deadline",
ADD COLUMN     "specs" TEXT;
