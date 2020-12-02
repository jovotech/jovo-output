import { IsNotEmpty, IsString, IsUrl } from 'jovo-output';

export class TextLink {
  @IsString()
  @IsNotEmpty()
  displayText: string;

  @IsUrl()
  url: string;
}
