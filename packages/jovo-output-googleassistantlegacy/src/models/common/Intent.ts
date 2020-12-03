import { IsNotEmpty, IsNotEmptyObject } from 'jovo-output';

import { IsString } from 'jovo-output';

export class Intent<T = Record<string | '@type', any>> {
  @IsString()
  @IsNotEmpty()
  intent: string | 'actions.intent.OPTION';

  @IsNotEmptyObject()
  data: T;
}
