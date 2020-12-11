import { IsNotEmpty, IsString } from 'jovo-output';

export class SlotValue {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}
