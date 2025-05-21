// src/listings/listings.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import {
  Category,
  Transmission,
  FuelType,
  BodyStyle,
  DriveTrain,
  Condition,
  FurnitureCategory,
  Material,
  FurnitureStyle,
  SalaryType,
  EmploymentType,
  ExperienceLevel,
  RemoteOption,
  ClothingType,
  Gender,
  PriceType,
  Platform,
  DeviceType,
} from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  /**
   * Create a new listing plus its category‐specific detail row.
   */
  async create(dto: CreateListingDto) {
    // 1) create the base listing
    const listing = await this.prisma.listing.create({
      data: {
        category: dto.category,
        title: dto.title,
        description: dto.description,
        price: dto.price,
      },
    });

    // 2) create the matching detail record
    const base = { listingId: listing.id };
    switch (dto.category) {
      case Category.cars:
        await this.prisma.carDetail.create({
          data: {
            ...base,
            transmission: dto.transmission,
            fuelType: dto.fuelType,
            bodyStyle: dto.bodyStyle,
            driveTrain: dto.driveTrain,
            condition: dto.condition,
            mileage: dto.mileage,
            year: dto.year,
            color: dto.color,
          },
        });
        break;

      case Category.furniture:
        await this.prisma.furnitureDetail.create({
          data: {
            ...base,
            category: dto.furnitureCategory,
            material: dto.material,
            style: dto.style,
            dimensions: dto.dimensions,
            weight: dto.weight,
          },
        });
        break;

      case Category.jobs:
      case Category.recruitment:
        await this.prisma.jobDetail.create({
          data: {
            ...base,
            salaryType: dto.salaryType,
            salaryMin: dto.salaryMin,
            salaryMax: dto.salaryMax,
            employmentType: dto.employmentType,
            experience: dto.experience,
            remoteOption: dto.remoteOption,
            location: dto.location,
          },
        });
        break;

      case Category.clothing:
        await this.prisma.clothingDetail.create({
          data: {
            ...base,
            type: dto.type,
            gender: dto.gender,
            size: dto.size,
            material: dto.material,
            condition: dto.condition,
          },
        });
        break;

      case Category.services:
        await this.prisma.serviceDetail.create({
          data: {
            ...base,
            priceType: dto.priceType,
            rateMin: dto.salaryMin,
            rateMax: dto.salaryMax,
            areaServed: dto.areaServed,
          },
        });
        break;

      case Category.projects:
        await this.prisma.projectDetail.create({
          data: {
            ...base,
            budgetMin: dto.salaryMin,
            budgetMax: dto.salaryMax,
            specs: dto.projectSpecs,
          },
        });
        break;

      case Category.games:
        await this.prisma.gameDetail.create({
          data: {
            ...base,
            platform: dto.platform,
            genre: dto.genre,
            condition: dto.condition,
          },
        });
        break;

      case Category.devices:
        await this.prisma.deviceDetail.create({
          data: {
            ...base,
            deviceType: dto.deviceType,
            brand: dto.brand,
            model: dto.model,
            specs: dto.specs,
            condition: dto.condition,
          },
        });
        break;
    }

    return this.findOne(listing.id);
  }

  /**
   * Fetch all listings, optionally filtering by category and/or search query.
   */
  async findAll(filter: { category?: string; q?: string } = {}) {
    const { category, q } = filter;
    const where: Prisma.ListingWhereInput = {};
    if (category) {
      where.category = category as Category;
    }
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    return this.prisma.listing.findMany({
      where,
      include: {
        images: true,
        carDetail: true,
        furnitureDetail: true,
        jobDetail: true,
        recruitmentDetail: true,
        clothingDetail: true,
        serviceDetail: true,
        projectDetail: true,
        gameDetail: true,
        deviceDetail: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Fetch one listing by its ID (throws 404 if not found).
   */
  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        images: true,
        carDetail: true,
        furnitureDetail: true,
        jobDetail: true,
        recruitmentDetail: true,
        clothingDetail: true,
        serviceDetail: true,
        projectDetail: true,
        gameDetail: true,
        deviceDetail: true,
      },
    });
    if (!listing) throw new NotFoundException(`Listing ${id} not found`);
    return listing;
  }

  /**
   * Update a listing’s core fields (and you can expand this to upsert details as needed).
   */
  async update(id: number, dto: UpdateListingDto) {
    await this.findOne(id);
    await this.prisma.listing.update({
      where: { id },
      data: {
        category: dto.category,
        title: dto.title,
        description: dto.description,
        price: dto.price,
      },
    });
    return this.findOne(id);
  }

  /**
   * Delete a listing (and cascade‐delete its images/details via Prisma foreign keys).
   */
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.listing.delete({ where: { id } });
  }

  /**
   * Upload one or more images for a listing.
   */
  async uploadListingImages(id: number, files: Express.Multer.File[]) {
    await this.findOne(id);
    const urls = await Promise.all(
      files.map((f) => this.cloudinary.uploadImage(f.buffer)),
    );
    await this.prisma.listingImage.createMany({
      data: urls.map((url) => ({ url, listingId: id })),
    });
    return urls;
  }
}
