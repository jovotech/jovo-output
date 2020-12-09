import { IsNotEmpty, IsOptional, IsString, Type, ValidateNested } from 'jovo-output';
import { ImageSource } from './ImageSource';

export class Image {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contentDescription?: string;

  @ValidateNested({ each: true })
  @Type(() => ImageSource)
  sources: ImageSource[];
}
