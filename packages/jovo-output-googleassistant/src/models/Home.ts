import { IsOptional, IsString } from 'jovo-output';

import { IsObject } from 'jovo-output';

export class Home {
  @IsOptional()
  @IsObject()
  params?: Record<string, unknown>;
}
