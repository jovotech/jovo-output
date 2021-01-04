import { PlatformOutput, Type } from 'jovo-output';
import { GoogleAssistantResponse } from './GoogleAssistantResponse';

export class GoogleAssistantOutput extends PlatformOutput<GoogleAssistantResponse> {
  @Type(() => GoogleAssistantResponse)
  nativeResponse?: GoogleAssistantResponse;
}
