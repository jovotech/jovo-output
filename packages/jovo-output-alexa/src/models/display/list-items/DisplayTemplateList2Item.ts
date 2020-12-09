import { IsNotEmpty, IsOptional, IsString, Type, ValidateNested } from 'jovo-output';
import { Image } from '../../common/Image';
import { TextContent } from '../TextContent';

export class DisplayTemplateList2Item {
  @IsString()
  @IsNotEmpty()
  token: string;

  @ValidateNested()
  @Type(() => Image)
  image: Image;

  @ValidateNested()
  @Type(() => TextContent)
  textContent: TextContent;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  backgroundImage?: Image;
}
