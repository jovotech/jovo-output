import {
  GenericCard,
  GenericCarousel,
  GenericMessage,
  GenericOutputBase,
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

// TODO: find a better way than having to copy the decorators
export class GoogleAssistantOutput
  implements Partial<GoogleAssistantResponse>, Partial<GenericOutputBase> {
  [key: string]: unknown;

  @IsOptional()
  @IsStringOrInstance(GenericMessage)
  @Type(() => GenericMessage)
  message?: Message;

  @IsOptional()
  @IsStringOrInstance(GenericMessage)
  @Type(() => GenericMessage)
  reprompt?: Message;

  @IsOptional()
  @IsBoolean()
  listen?: boolean;

  @IsOptional()
  @IsArray()
  @IsStringOrInstance(GenericQuickReply, {
    each: true,
  })
  @Type(() => GenericQuickReply)
  quickReplies?: QuickReply[];

  @IsOptional()
  @IsInstance(GenericCard)
  @ValidateNested()
  @Type(() => GenericCard)
  card?: GenericCard;

  @IsOptional()
  @IsInstance(GenericCarousel)
  @ValidateNested()
  @Type(() => GenericCarousel)
  carousel?: GenericCarousel;

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
