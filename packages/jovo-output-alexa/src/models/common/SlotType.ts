import { ArrayMaxSize, IsArray, IsNotEmpty, Type, ValidateNested } from 'jovo-output';
import { IsString } from 'jovo-output';
import { SlotTypeValue } from './SlotTypeValue';

export class SlotType {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => SlotTypeValue)
  values: SlotTypeValue[];
}
