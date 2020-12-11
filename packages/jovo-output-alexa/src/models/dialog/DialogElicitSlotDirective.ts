import { Equals, IsNotEmpty, IsString } from 'jovo-output';
import { DialogDirective } from './DialogDirective';

export class DialogElicitSlotDirective extends DialogDirective<'Dialog.ElicitSlot'> {
  @Equals('Dialog.ElicitSlot')
  type: 'Dialog.ElicitSlot';

  @IsString()
  @IsNotEmpty()
  slotToElicit: string;
}
