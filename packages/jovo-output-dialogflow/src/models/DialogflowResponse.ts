import { Context } from './Context';
import { EventInput } from './EventInput';
import { Message } from './Message';
import { SessionEntityType } from './SessionEntityType';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from 'jovo-output';

export class DialogflowResponse<P extends Record<string, unknown> = Record<string, unknown>> {
  [key: string]: unknown;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fulfillment_text?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Message)
  fulfillment_messages?: Message[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source?: string;

  @IsOptional()
  @IsObject()
  payload?: P;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Context)
  output_contexts?: Context[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EventInput)
  followup_event_input?: EventInput;

  @IsOptional()
  @IsBoolean()
  end_interaction?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SessionEntityType)
  session_entity_types?: SessionEntityType[];
}
