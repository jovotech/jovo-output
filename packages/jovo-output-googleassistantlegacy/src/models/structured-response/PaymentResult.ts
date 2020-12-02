import { IsNotEmpty, IsString, ValidateIf } from 'jovo-output';

export class PaymentResult {
  @ValidateIf((o) => !o.merchantPaymentMethodId)
  @IsString()
  @IsNotEmpty()
  googlePaymentData?: string;

  @ValidateIf((o) => !o.googlePaymentData)
  @IsString()
  @IsNotEmpty()
  merchantPaymentMethodId?: string;
}
