import { IsString, IsNotEmpty, ValidateIf, IsOptional, MaxLength } from 'jovo-output';

// TODO: probably find a better way to type that either textToSpeech or ssml has to be defined
export class SimpleResponse {
  @ValidateIf((o) => !o.ssml)
  @IsString()
  @IsNotEmpty()
  textToSpeech?: string;

  @ValidateIf((o) => !o.textToSpeech)
  @IsString()
  @IsNotEmpty()
  ssml?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(640)
  displayText?: string;
}
