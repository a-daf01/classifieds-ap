// src/listings/dto/create-listing.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;
}
