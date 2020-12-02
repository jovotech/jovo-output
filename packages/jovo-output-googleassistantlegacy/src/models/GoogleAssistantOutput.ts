import { Type, ValidateNested } from 'jovo-output';
import { RichResponse } from './RichResponse';

export class GoogleAssistantOutput {
  [key: string]: unknown;

  @ValidateNested()
  @Type(() => RichResponse)
  richResponse: RichResponse;
}
