import { IsArray, IsBoolean, IsOptional, Type, ValidateNested } from 'jovo-output';
import { Card } from './card/Card';
import { Directive } from './Directive';
import { OutputSpeech } from './common/OutputSpeech';
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
