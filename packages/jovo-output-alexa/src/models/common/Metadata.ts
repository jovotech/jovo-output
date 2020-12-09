import { IsNotEmpty, IsOptional, IsString } from 'jovo-output';

export class Metadata {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subtitle?: string;
}
