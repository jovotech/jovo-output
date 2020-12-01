import { IsNotEmpty, IsString } from 'jovo-output';

export class GoogleAssistantOutput {
  [key: string]: unknown;

  @IsString()
  @IsNotEmpty()
  test: string;
}
