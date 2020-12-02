import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsClassOrString,
  IsOptional,
  Type,
  ValidateNested,
} from 'jovo-output';
import { Suggestion } from './common/Suggestion';
import { LinkOutSuggestion } from './LinkOutSuggestion';
import { RichResponseItem } from './RichResponseItem';

export class RichResponse {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => RichResponseItem)
  items: RichResponseItem[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(8)
  @IsClassOrString(Suggestion, {
    each: true,
  })
  @Type(() => Suggestion)
  suggestions?: Array<Suggestion | string>;

  @IsOptional()
  @ValidateNested()
  linkOutSuggestion?: LinkOutSuggestion;
}
