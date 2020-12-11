import { IsNotEmpty, IsString } from 'jovo-output';
import { Directive } from '../Directive';

export class AplDirective<TYPE extends string> extends Directive<TYPE> {
  @IsString()
  @IsNotEmpty()
  token: string;
}
