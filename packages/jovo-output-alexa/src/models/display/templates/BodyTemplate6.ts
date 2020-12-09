import {
  Equals,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from 'jovo-output';
import { Image } from '../../common/Image';
import { BackButtonVisibility, DisplayTemplate, DisplayTemplateType } from '../DisplayTemplate';
import { TextContent } from '../TextContent';

export class BodyTemplate6 implements DisplayTemplate<DisplayTemplateType.Body6> {
  @Equals(DisplayTemplateType.Body6)
  type: DisplayTemplateType.Body6;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  @IsEnum(BackButtonVisibility)
  backButton?: BackButtonVisibility;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  backgroundImage?: Image;

  @ValidateNested()
  @Type(() => Image)
  image: Image;

  @ValidateNested()
  @Type(() => TextContent)
  textContent: TextContent;
}
