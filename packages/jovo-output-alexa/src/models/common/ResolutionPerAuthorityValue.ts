import { Type } from 'jovo-output';
import { ValidateNested } from 'jovo-output';
import { SlotValue } from './SlotValue';

export class ResolutionPerAuthorityValue {
  @ValidateNested()
  @Type(() => SlotValue)
  value: SlotValue;
}
