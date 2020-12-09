import { IsNotEmpty, IsOptional, IsString, Type, ValidateNested } from 'jovo-output';
import { Image } from '../../common/Image';
import { TextContent } from '../TextContent';

export class DisplayTemplateList1Item {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image?: Image;

  @ValidateNested()
  @Type(() => TextContent)
  textContent: TextContent;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  backgroundImage?: Image;
}
