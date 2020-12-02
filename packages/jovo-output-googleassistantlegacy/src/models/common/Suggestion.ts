import { IsNotEmpty, IsString, MaxLength } from 'jovo-output';

export class Suggestion {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  title: string;
}
