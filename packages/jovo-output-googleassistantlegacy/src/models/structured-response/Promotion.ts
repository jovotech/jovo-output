import { IsNotEmpty, IsString } from 'jovo-output';

export class Promotion {
  @IsString()
  @IsNotEmpty()
  coupon: string;
}
