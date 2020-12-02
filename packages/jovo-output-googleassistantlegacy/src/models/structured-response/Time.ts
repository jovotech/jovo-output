import { IsISO8601 } from 'jovo-output';

export class Time {
  @IsISO8601()
  timeIso8601: string;
}
