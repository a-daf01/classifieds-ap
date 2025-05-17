// src/listings/listings.module.ts
import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],   // ← import here to get PrismaService
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
