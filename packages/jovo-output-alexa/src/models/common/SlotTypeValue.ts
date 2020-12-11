import { IsNotEmpty, IsString, Type, ValidateNested } from 'jovo-output';
import { SlotTypeValueName } from './SlotTypeValueName';

export class SlotTypeValue {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ValidateNested()
  @Type(() => SlotTypeValueName)
  name: SlotTypeValueName;
}
