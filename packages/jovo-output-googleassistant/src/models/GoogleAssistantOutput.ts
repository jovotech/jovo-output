import { IsString } from 'jovo-output';

export class GoogleAssistantOutput {
  [key: string]: unknown;
  @IsString()
  test: string;
}
