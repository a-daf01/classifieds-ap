import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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

export class CreateListingDto {
  @IsEnum(Category)
  category: Category;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  // --- Cars ---
  @IsEnum(Transmission)
  @IsOptional()
  transmission?: Transmission;

  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType;

  @IsEnum(BodyStyle)
  @IsOptional()
  bodyStyle?: BodyStyle;

  @IsEnum(DriveTrain)
  @IsOptional()
  driveTrain?: DriveTrain;

  @IsEnum(Condition)
  @IsOptional()
  condition?: Condition;

  @IsNumber()
  @IsOptional()
  mileage?: number;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  color?: string;

  // --- Furniture ---
  @IsEnum(FurnitureCategory)
  @IsOptional()
  furnitureCategory?: FurnitureCategory;

  @IsEnum(Material)
  @IsOptional()
  material?: Material;

  @IsEnum(FurnitureStyle)
  @IsOptional()
  style?: FurnitureStyle;

  @IsString()
  @IsOptional()
  dimensions?: string;

  @IsNumber()
  @IsOptional()
  weight?: number;

  // --- Jobs (seeking) & Recruitment (hiring) ---
  @IsEnum(SalaryType)
  @IsOptional()
  salaryType?: SalaryType;

  @IsNumber()
  @IsOptional()
  salaryMin?: number;

  @IsNumber()
  @IsOptional()
  salaryMax?: number;

  @IsEnum(EmploymentType)
  @IsOptional()
  employmentType?: EmploymentType;

  @IsEnum(ExperienceLevel)
  @IsOptional()
  experience?: ExperienceLevel;

  @IsEnum(RemoteOption)
  @IsOptional()
  remoteOption?: RemoteOption;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  companyName?: string; // for recruitment postings

  // --- Clothing ---
  @IsEnum(ClothingType)
  @IsOptional()
  type?: ClothingType;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  size?: string;

  // --- Services ---
  @IsEnum(PriceType)
  @IsOptional()
  priceType?: PriceType;

  // reuse salaryMin / salaryMax for rateMin / rateMax
  @IsString()
  @IsOptional()
  areaServed?: string;

  // --- Projects ---
  @IsString()
  @IsOptional()
  projectSpecs?: string;

  // --- Games ---
  @IsEnum(Platform)
  @IsOptional()
  platform?: Platform;

  @IsString()
  @IsOptional()
  genre?: string;

  // --- Devices ---
  @IsEnum(DeviceType)
  @IsOptional()
  deviceType?: DeviceType;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  specs?: string;
}