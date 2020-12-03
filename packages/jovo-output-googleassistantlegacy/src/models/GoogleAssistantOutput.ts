import {
  GenericCard,
  GenericCarousel,
  GenericMessage,
  GenericOutputBase,
  GenericQuickReply,
  IsArray,
  IsBoolean,
  IsInstance,
  IsInstanceOrString,
  IsOptional,
  Message,
  QuickReply,
  Type,
  ValidateNested,
} from 'jovo-output';
import { Intent } from './common/Intent';
import { GoogleAssistantResponse } from './GoogleAssistantResponse';
import { RichResponse } from './RichResponse';
import { SimpleResponse } from './simple-response/SimpleResponse';

// TODO: find a better way than having to copy the decorators
export class GoogleAssistantOutput
  implements Partial<GoogleAssistantResponse>, Partial<GenericOutputBase> {
  [key: string]: unknown;

  @IsOptional()
  @IsInstanceOrString(GenericMessage)
  @Type(() => GenericMessage)
  message?: Message;

  @IsOptional()
  @IsInstanceOrString(GenericMessage)
  @Type(() => GenericMessage)
  reprompt?: Message;

  @IsOptional()
  @IsBoolean()
  listen?: boolean;

  @IsOptional()
  @IsArray()
  @IsInstanceOrString(GenericQuickReply, {
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
  systemIntent?: Intent;

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
