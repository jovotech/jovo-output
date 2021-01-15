import { IsArray, IsNotEmpty, IsOptional, IsString, Message } from 'jovo-output';

export class Text {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  text?: string[];

  toMessage?(): Message {
    return {
      text: this.text?.[0] || '',
    };
  }
}