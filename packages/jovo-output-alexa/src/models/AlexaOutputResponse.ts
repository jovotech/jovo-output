import { IsObject, IsOptional, IsSemVer, Type, ValidateNested } from 'jovo-output';
import { AlexaResponse } from './AlexaResponse';
import { Response } from './Response';

export class AlexaOutputResponse implements Partial<AlexaResponse> {
  [key: string]: unknown;

  @IsOptional()
  @IsSemVer()
  version?: string;

  @IsOptional()
  @IsObject()
  sessionAttributes?: Record<string, unknown>;

  @IsOptional()
  @ValidateNested()
  @Type(() => Response)
  response?: Response;
}
