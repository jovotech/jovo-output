import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from '..';
import { IsClassOrString } from '../validation/decorators/IsClassOrString';
import { GenericQuickReply, QuickReply } from './GenericQuickReply';

export type Message = string | GenericMessage;

export class GenericMessage {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  displayText?: string;

  @IsOptional()
  @IsArray()
  @IsClassOrString(GenericQuickReply, {
    each: true,
  })
  @Type(() => GenericQuickReply)
  quickReplies?: QuickReply[];
}
