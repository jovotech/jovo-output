import { Type } from 'class-transformer';
import { GenericQuickReply, IsNotEmpty, IsOptional, IsString } from '..';
import { QuickReply } from './GenericQuickReply';

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
  // TODO: add validation
  @Type(() => GenericQuickReply)
  quickReplies?: QuickReply[];
}
