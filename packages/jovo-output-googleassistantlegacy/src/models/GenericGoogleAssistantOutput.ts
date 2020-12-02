import { GenericOutput, Type, ValidateNested } from 'jovo-output';
import { GoogleAssistantOutput } from './GoogleAssistantOutput';
import { RichResponse } from './RichResponse';

// TODO: find a better name and/or determine if this is even required
export class GenericGoogleAssistantOutput
  extends GenericOutput
  implements Partial<GoogleAssistantOutput> {
  @ValidateNested()
  @Type(() => RichResponse)
  richResponse: RichResponse;
}
