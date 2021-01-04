import { PlatformOutput, Type } from 'jovo-output';
import { AlexaOutputResponse } from './AlexaOutputResponse';

export class AlexaOutput extends PlatformOutput<AlexaOutputResponse> {
  @Type(() => AlexaOutputResponse)
  nativeResponse?: AlexaOutputResponse;
}
