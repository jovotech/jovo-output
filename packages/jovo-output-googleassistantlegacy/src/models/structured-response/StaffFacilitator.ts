import { IsNotEmpty, IsOptional, IsString, Type, ValidateNested } from 'jovo-output';
import { Image } from '../common/Image';

export class StaffFacilitator {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image?: Image;
}
