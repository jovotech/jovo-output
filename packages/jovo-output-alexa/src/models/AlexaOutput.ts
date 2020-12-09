import {
  GenericCard,
  GenericCarousel,
  GenericMessage,
  GenericOutputBase,
  GenericQuickReply,
  IsArray,
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsStringOrInstance,
  Message,
  QuickReply,
  Type,
  ValidateNested,
} from 'jovo-output';
import { AlexaResponse } from './AlexaResponse';
import { Response } from './Response';

export class AlexaOutput implements Partial<AlexaResponse>, Partial<GenericOutputBase> {
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
  @IsString()
  @IsNotEmpty()
  version?: string;

  @IsOptional()
  @IsObject()
  sessionAttributes?: Record<string, any>;

  @IsOptional()
  @ValidateNested()
  @Type(() => Response)
  response?: Response;
}
