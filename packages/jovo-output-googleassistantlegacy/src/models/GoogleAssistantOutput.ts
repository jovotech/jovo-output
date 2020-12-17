import {
  GenericCard,
  GenericCarousel,
  GenericMessage,
  GenericOutput,
  GenericQuickReply,
  IsArray,
  IsBoolean,
  IsInstance,
  IsOptional,
  IsStringOrInstance,
  Message,
  QuickReply,
  Type,
  ValidateNested,
} from 'jovo-output';
import { SystemIntent } from './common/SystemIntent';
import { GoogleAssistantResponse } from './GoogleAssistantResponse';
import { RichResponse } from './RichResponse';
import { SimpleResponse } from './simple-response/SimpleResponse';

export class GoogleAssistantOutput
  extends GenericOutput
  implements Partial<GoogleAssistantResponse> {
  [key: string]: unknown;

  @IsOptional()
  @IsBoolean()
  expectUserResponse?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => SystemIntent)
  systemIntent?: SystemIntent;

  @IsOptional()
  @ValidateNested()
  @Type(() => RichResponse)
  richResponse?: RichResponse;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => SimpleResponse)
  noInputPrompts?: SimpleResponse[];
}
