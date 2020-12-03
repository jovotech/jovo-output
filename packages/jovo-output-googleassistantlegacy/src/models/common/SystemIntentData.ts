import { IsOptional, IsString, Type, ValidateNested } from 'jovo-output';

import { IsNotEmpty } from 'jovo-output';
import { Carousel } from '../collection/Carousel';

export class SystemIntentData {
  @IsString()
  @IsNotEmpty()
  '@type': string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Carousel)
  'carouselSelect'?: Carousel;
}
