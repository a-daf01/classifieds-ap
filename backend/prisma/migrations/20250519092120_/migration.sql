/*
  Warnings:

  - Changed the type of `category` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('cars', 'furniture', 'jobs', 'services', 'projects', 'games', 'devices');

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
