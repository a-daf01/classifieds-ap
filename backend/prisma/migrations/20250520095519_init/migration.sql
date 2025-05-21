-- AlterTable
ALTER TABLE "ClothingDetail" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "DeviceDetail" ADD COLUMN     "releaseYear" INTEGER;

-- AlterTable
ALTER TABLE "FurnitureDetail" ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "GameDetail" ADD COLUMN     "releaseYear" INTEGER;

-- AlterTable
ALTER TABLE "ProjectDetail" ADD COLUMN     "deadline" TIMESTAMP(3);
