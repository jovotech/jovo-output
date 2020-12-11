import { IsNotEmpty, IsString } from 'jovo-output';

export class Directive<TYPE extends string = string> {
  [key: string]: unknown;

  @IsString()
  @IsNotEmpty()
  type: TYPE;
}
