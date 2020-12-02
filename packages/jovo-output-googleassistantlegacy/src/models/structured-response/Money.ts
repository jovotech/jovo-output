import { IsString, IsNotEmpty, Length } from 'jovo-output';

export class Money {
  @IsString()
  @Length(3, 3)
  currencyCode: string;

  @IsString()
  @IsNotEmpty()
  amountInMicros: string;
}
