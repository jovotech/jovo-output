import { IsArray, IsBoolean, IsOptional, Type, ValidateNested } from 'jovo-output';
import { Card } from './Card';
import { Directive } from './Directive';
import { OutputSpeech } from './OutputSpeech';
import { Reprompt } from './Reprompt';

export class Response {
  @IsOptional()
  @ValidateNested()
  @Type(() => OutputSpeech)
  outputSpeech?: OutputSpeech;

  @IsOptional()
  @ValidateNested()
  @Type(() => Card)
  card?: Card;

  @IsOptional()
  @ValidateNested()
  @Type(() => Reprompt)
  reprompt?: Reprompt;

  @IsOptional()
  @IsBoolean()
  shouldEndSession?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => Directive)
  directives?: Directive[];
}
