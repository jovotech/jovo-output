import { IsDateString } from 'jovo-output';

export class ActionMetadata {
  @IsDateString()
  expireTime: string;
}
