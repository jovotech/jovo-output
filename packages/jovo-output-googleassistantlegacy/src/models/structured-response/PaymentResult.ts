import { IsValidPaymentResultString } from '../../validation/decorators/IsValidPaymentResultString';

export class PaymentResult {
  @IsValidPaymentResultString()
  googlePaymentData?: string;

  @IsValidPaymentResultString()
  merchantPaymentMethodId?: string;
}
