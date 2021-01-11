import { IsPhoneNumber } from 'jovo-output';

export class TelephonyTransferCall {
  @IsPhoneNumber(null)
  phone_number: string;
}
