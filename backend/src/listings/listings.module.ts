// src/listings/listings.module.ts
import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { PrismaModule } from '../prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,  // ← add this
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
