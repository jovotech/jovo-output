import { IsOptional, Type, ValidateNested } from 'jovo-output';
import { OutputSpeech } from './common/OutputSpeech';

export class Reprompt {
  @IsOptional()
  @ValidateNested()
  @Type(() => OutputSpeech)
  outputSpeech?: OutputSpeech;
}
