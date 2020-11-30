import { IsNotEmpty, IsOptional, IsString } from '..';

export class GenericCard {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  key?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subtitle?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageUrl?: string;
}
