import { IsNotEmpty, IsObject, IsOptional, IsString, Type, ValidateNested } from 'jovo-output';
import { Response } from './Response';

export class AlexaResponse {
  [key: string]: unknown;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsOptional()
  @IsObject()
  sessionAttributes?: Record<string, unknown>;

  @ValidateNested()
  @Type(() => Response)
  response: Response;
}
