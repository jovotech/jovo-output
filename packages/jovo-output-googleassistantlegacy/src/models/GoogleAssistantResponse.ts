import { IsOptional, IsBoolean, Type, ValidateNested, IsArray } from 'jovo-output';
import { RichResponse } from './RichResponse';
import { SimpleResponse } from './simple-response/SimpleResponse';

export class GoogleAssistantResponse {
  [key: string]: unknown;

  @IsOptional()
  @IsBoolean()
  expectUserResponse?: boolean;

  @ValidateNested()
  @Type(() => RichResponse)
  richResponse: RichResponse;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => SimpleResponse)
  noInputPrompts?: SimpleResponse[];
}
