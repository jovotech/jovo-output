import { IsEnum, IsOptional, Message, removeSSMLSpeakTags } from 'jovo-output';
import { IsValidOutputSpeechString } from '../validation/decorators/IsValidOutputSpeechString';

export enum OutputSpeechType {
  Plain = 'PlainText',
  Ssml = 'SSML',
}

export enum PlayBehavior {
  Enqueue = 'ENQUEUE',
  ReplaceAll = 'REPLACE_ALL',
  ReplaceEnqueued = 'REPLACE_ENQUEUED',
}

export class OutputSpeech<TYPE extends OutputSpeechType = OutputSpeechType> {
  @IsEnum(OutputSpeechType)
  type: TYPE;

  @IsValidOutputSpeechString(OutputSpeechType.Plain)
  text?: TYPE extends OutputSpeechType.Plain
    ? string
    : TYPE extends OutputSpeechType.Ssml
    ? undefined
    : string | undefined;

  @IsValidOutputSpeechString(OutputSpeechType.Ssml)
  ssml?: TYPE extends OutputSpeechType.Ssml
    ? string
    : TYPE extends OutputSpeechType.Plain
    ? undefined
    : string | undefined;

  @IsOptional()
  @IsEnum(PlayBehavior)
  playBehavior?: PlayBehavior;

  toMessage?(): Message {
    return this.type === OutputSpeechType.Plain
      ? ((this.text || '') as string)
      : removeSSMLSpeakTags((this.ssml || '') as string);
  }
}
