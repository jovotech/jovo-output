import { IsNotEmpty, IsString, IsUrl, Type, ValidateIf, ValidateNested } from 'jovo-output';
import { Image } from '../common/Image';

export class MediaObject {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsUrl()
  contentUrl: string;

  @ValidateIf((o) => !o.icon)
  @ValidateNested()
  @Type(() => Image)
  largeImage?: Image;

  @ValidateIf((o) => !o.largeImage)
  @ValidateNested()
  @Type(() => Image)
  icon?: Image;
}
