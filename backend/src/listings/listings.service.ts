import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Listing } from '@prisma/client';
import { UpdateListingDto } from './dto/update-listing.dto';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Listing[]> {
    return this.prisma.listing.findMany();
  }

  async findOne(id: number): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException(`Listing with id ${id} not found`);
    return listing;
  }

  async create(data: CreateListingDto): Promise<Listing> {
    return this.prisma.listing.create({ data });
  }

  async update(id: number, data: UpdateListingDto): Promise<Listing> {
    await this.findOne(id); // ensures it exists or throws 404
    return this.prisma.listing.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Listing> {
    await this.findOne(id);
    return this.prisma.listing.delete({ where: { id } });
  }
}
