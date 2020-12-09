import { IsOptional, Type, ValidateNested } from 'jovo-output';
import { TextContentItem } from './TextContentItem';

export class TextContent {
  @ValidateNested()
  @Type(() => TextContentItem)
  primaryText: TextContentItem;

  @IsOptional()
  @ValidateNested()
  @Type(() => TextContentItem)
  secondaryText?: TextContentItem;

  @IsOptional()
  @ValidateNested()
  @Type(() => TextContentItem)
  tertiaryText?: TextContentItem;
}
