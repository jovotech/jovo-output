import { IsNotEmpty, IsNotEmptyObject, Type, ValidateNested } from 'jovo-output';

import { IsString } from 'jovo-output';
import { SystemIntentData } from './SystemIntentData';

export class SystemIntent {
  @IsString()
  @IsNotEmpty()
  intent: string | 'actions.intent.OPTION';

  @ValidateNested()
  @Type(() => SystemIntentData)
  data: SystemIntentData;
}
