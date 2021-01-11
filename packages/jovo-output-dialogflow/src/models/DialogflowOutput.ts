import { PlatformOutput, Type } from 'jovo-output';
import { DialogflowResponse } from './DialogflowResponse';

export class DialogflowOutput extends PlatformOutput<DialogflowResponse> {
  @Type(() => DialogflowResponse)
  nativeResponse?: DialogflowResponse;
}
