import { IsNotEmpty, IsString, MaxLength, Type, ValidateNested } from 'jovo-output';
import { OpenUrl } from './OpenUrl';

export class Link {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ValidateNested()
  @Type(() => OpenUrl)
  open: OpenUrl;
}
