import { ArrayMaxSize, IsArray, IsNotEmpty, IsString } from 'jovo-output';

export class Expected {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMaxSize(1000)
  speech: string[];

  @IsString()
  @IsNotEmpty()
  languageCode: string;
}
