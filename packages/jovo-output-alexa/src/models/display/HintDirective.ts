import { Equals, Type, ValidateNested } from 'jovo-output';
import { Directive } from '../Directive';
import { TextContentItem } from './TextContentItem';

export class HintDirective extends Directive<'Hint'> {
  @Equals('Hint')
  type: 'Hint';

  @ValidateNested()
  @Type(() => TextContentItem)
  hint: TextContentItem;
}
