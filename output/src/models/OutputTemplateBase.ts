import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsBooleanOrInstance,
  IsInstance,
  IsOptional,
  Listen,
  ListenValue,
  ValidateNested,
} from '..';
import { IsStringOrInstance } from '../decorators/validation/IsStringOrInstance';
import { Card } from './Card';
import { Carousel } from './Carousel';
import { Message, MessageValue } from './Message';
import { RichAudio } from './RichAudio';
import { QuickReply, QuickReplyValue } from './QuickReply';

export class OutputTemplateBase {
  [key: string]: unknown;

  @IsOptional()
  @IsStringOrInstance(Message)
  @Type(() => Message)
  message?: MessageValue;

  @IsOptional()
  @IsStringOrInstance(Message)
  @Type(() => Message)
  reprompt?: MessageValue;

  @IsOptional()
  @IsBooleanOrInstance(Listen)
  @Type(() => Listen)
  listen?: ListenValue;

  @IsOptional()
  @IsArray()
  @IsStringOrInstance(QuickReply, {
    each: true,
  })
  @Type(() => QuickReply)
  quickReplies?: QuickReplyValue[];

  @IsOptional()
  @IsInstance(Card)
  @ValidateNested()
  @Type(() => Card)
  card?: Card;

  @IsOptional()
  @IsInstance(Carousel)
  @ValidateNested()
  @Type(() => Carousel)
  carousel?: Carousel;

  @IsOptional()
  @IsInstance(RichAudio)
  @ValidateNested()
  @Type(() => RichAudio)
  richAudio?: RichAudio;
}
