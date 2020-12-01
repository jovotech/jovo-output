import { GenericOutput, IsNotEmpty, IsOptional, IsString } from 'jovo-output';
import { GoogleAssistantOutput } from './GoogleAssistantOutput';

// TODO: find a better name and/or determine if this is even required
export class GenericGoogleAssistantOutput
  extends GenericOutput
  implements Partial<GoogleAssistantOutput> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  test?: string;
}
