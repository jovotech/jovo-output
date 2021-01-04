import { PlatformOutput, Type } from 'jovo-output';
import { FacebookMessengerOutputResponse } from './FacebookMessengerOutputResponse';

export class FacebookMessengerOutput extends PlatformOutput<FacebookMessengerOutputResponse> {
  @Type(() => FacebookMessengerOutputResponse)
  nativeResponse?: FacebookMessengerOutputResponse;
}
