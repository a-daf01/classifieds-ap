import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [
    // ← this must go first, so all later modules see process.env
    ConfigModule.forRoot({ isGlobal: true }),

    PrismaModule,
    CloudinaryModule,
    ListingsModule,
  ],
})
export class AppModule {}
