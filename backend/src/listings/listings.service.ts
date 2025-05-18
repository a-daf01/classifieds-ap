import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';  
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ListingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createListingDto: CreateListingDto) {
    return this.prisma.listing.create({ data: createListingDto });
  }

  async findAll() {
    return this.prisma.listing.findMany({ include: { images: true } });
  }

  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!listing) throw new NotFoundException(`Listing with id ${id} not found`);
    return listing;
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    await this.findOne(id);
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.listing.delete({ where: { id } });
  }

  async uploadListingImages(id: number, files: any[]) {
    await this.findOne(id);
    const urls = await Promise.all(
      files.map(file => this.cloudinaryService.uploadImage(file.buffer)),
    );
    await this.prisma.listingImage.createMany({
      data: urls.map(url => ({ url, listingId: id })),
    });
    return urls;
  }
}