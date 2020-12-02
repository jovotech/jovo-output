import { IsNotEmpty, IsString, Type, ValidateNested } from 'jovo-output';
import { DisclosurePresentationOptions } from './DisclosurePresentationOptions';
import { DisclosureText } from './DisclosureText';

export class Disclosure {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested()
  @Type(() => DisclosureText)
  disclosureText: DisclosureText;

  @ValidateNested()
  @Type(() => DisclosurePresentationOptions)
  presentationOptions: DisclosurePresentationOptions;
}
