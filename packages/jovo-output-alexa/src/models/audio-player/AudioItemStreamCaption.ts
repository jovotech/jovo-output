import { IsNotEmpty, IsOptional, IsString } from 'jovo-output';

export class AudioItemStreamCaption {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;


}
