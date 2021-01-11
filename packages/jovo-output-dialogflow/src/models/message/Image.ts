import { IsNotEmpty, IsOptional, IsString } from 'jovo-output';

export class Image {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_uri?: string;

  @IsString()
  @IsNotEmpty()
  accessibility_text: string;
}
