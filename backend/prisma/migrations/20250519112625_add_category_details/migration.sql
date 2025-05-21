-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTOMATIC', 'MANUAL', 'SEMI_AUTO');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "BodyStyle" AS ENUM ('SEDAN', 'SUV', 'HATCHBACK', 'COUPE', 'CONVERTIBLE', 'TRUCK');

-- CreateEnum
CREATE TYPE "DriveTrain" AS ENUM ('FWD', 'RWD', 'AWD_4WD');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'LIKE_NEW', 'USED', 'SALVAGE', 'WORN');

-- CreateEnum
CREATE TYPE "FurnitureCategory" AS ENUM ('sofa', 'table', 'chair', 'bed', 'cabinet', 'desk', 'other');

-- CreateEnum
CREATE TYPE "Material" AS ENUM ('wood', 'metal', 'glass', 'plastic', 'upholstered', 'mixed');

-- CreateEnum
CREATE TYPE "FurnitureStyle" AS ENUM ('modern', 'contemporary', 'vintage', 'rustic', 'industrial');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('yearly', 'monthly', 'hourly');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('full_time', 'part_time', 'contract', 'internship', 'freelance');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('entry', 'mid', 'senior', 'director');

-- CreateEnum
CREATE TYPE "RemoteOption" AS ENUM ('onsite', 'remote', 'hybrid');

-- CreateEnum
CREATE TYPE "ClothingType" AS ENUM ('shirt', 'pants', 'dress', 'jacket', 'shoes', 'accessory', 'other');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('men', 'women', 'unisex', 'kids');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('hourly', 'flat', 'per_project');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('pc', 'ps5', 'xbox', 'switch', 'mobile', 'other');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('phone', 'laptop', 'tablet', 'wearable', 'other');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'recruitment';
ALTER TYPE "Category" ADD VALUE 'clothing';

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CarDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "transmission" "Transmission",
    "fuelType" "FuelType",
    "bodyStyle" "BodyStyle",
    "driveTrain" "DriveTrain",
    "condition" "Condition",
    "mileage" INTEGER,
    "year" INTEGER,
    "color" TEXT,

    CONSTRAINT "CarDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FurnitureDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "category" "FurnitureCategory",
    "material" "Material",
    "style" "FurnitureStyle",
    "dimensions" TEXT,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "FurnitureDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "salaryType" "SalaryType",
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "employmentType" "EmploymentType",
    "experience" "ExperienceLevel",
    "remoteOption" "RemoteOption",
    "location" TEXT,

    CONSTRAINT "JobDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruitmentDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "companyName" TEXT,
    "salaryType" "SalaryType",
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "employmentType" "EmploymentType",
    "experience" "ExperienceLevel",
    "remoteOption" "RemoteOption",
    "location" TEXT,

    CONSTRAINT "RecruitmentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "type" "ClothingType",
    "gender" "Gender",
    "size" TEXT,
    "material" "Material",
    "condition" "Condition",

    CONSTRAINT "ClothingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "priceType" "PriceType",
    "rateMin" DOUBLE PRECISION,
    "rateMax" DOUBLE PRECISION,
    "areaServed" TEXT,

    CONSTRAINT "ServiceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "budgetMin" DOUBLE PRECISION,
    "budgetMax" DOUBLE PRECISION,
    "deadline" TIMESTAMP(3),

    CONSTRAINT "ProjectDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "platform" "Platform",
    "genre" TEXT,
    "condition" "Condition",

    CONSTRAINT "GameDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceDetail" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "deviceType" "DeviceType",
    "brand" TEXT,
    "model" TEXT,
    "condition" "Condition",
    "specs" TEXT,

    CONSTRAINT "DeviceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarDetail_listingId_key" ON "CarDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "FurnitureDetail_listingId_key" ON "FurnitureDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "JobDetail_listingId_key" ON "JobDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "RecruitmentDetail_listingId_key" ON "RecruitmentDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "ClothingDetail_listingId_key" ON "ClothingDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceDetail_listingId_key" ON "ServiceDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetail_listingId_key" ON "ProjectDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "GameDetail_listingId_key" ON "GameDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceDetail_listingId_key" ON "DeviceDetail"("listingId");

-- AddForeignKey
ALTER TABLE "CarDetail" ADD CONSTRAINT "CarDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FurnitureDetail" ADD CONSTRAINT "FurnitureDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentDetail" ADD CONSTRAINT "RecruitmentDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingDetail" ADD CONSTRAINT "ClothingDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetail" ADD CONSTRAINT "ServiceDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDetail" ADD CONSTRAINT "ProjectDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDetail" ADD CONSTRAINT "GameDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceDetail" ADD CONSTRAINT "DeviceDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
