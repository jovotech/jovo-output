import { Equals } from 'jovo-output';
import { DialogDirective } from './DialogDirective';

export class DialogConfirmIntentDirective extends DialogDirective<'Dialog.ConfirmIntent'> {
  @Equals('Dialog.ConfirmIntent')
  type: 'Dialog.ConfirmIntent';
}
