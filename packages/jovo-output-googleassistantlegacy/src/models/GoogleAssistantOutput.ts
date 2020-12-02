import { GenericOutput, IsArray, IsBoolean, IsOptional, Type, ValidateNested } from 'jovo-output';
import { GoogleAssistantResponse } from './GoogleAssistantResponse';
import { RichResponse } from './RichResponse';
import { SimpleResponse } from './simple-response/SimpleResponse';

export class GoogleAssistantOutput extends GenericOutput implements GoogleAssistantResponse {
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