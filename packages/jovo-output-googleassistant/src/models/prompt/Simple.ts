import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'jovo-output';

export class Simple {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  speech?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(640)
  text?: string;
}
