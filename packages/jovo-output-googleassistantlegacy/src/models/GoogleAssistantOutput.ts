import { PlatformOutput, Type } from 'jovo-output';
import { GoogleAssistantOutputResponse } from './GoogleAssistantOutputResponse';

export class GoogleAssistantOutput extends PlatformOutput<GoogleAssistantOutputResponse> {
  @Type(() => GoogleAssistantOutputResponse)
  nativeResponse?: GoogleAssistantOutputResponse;
}
