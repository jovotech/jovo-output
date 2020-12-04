import { isString, ValidationOptions } from 'jovo-output';
import { PaymentResult } from '../../models';
import { IsEitherValid } from './IsEitherValid';

export function IsValidPaymentResultString(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsEitherValid<PaymentResult>(
    {
      name: 'isValidPaymentResultString',
      keys: ['googlePaymentData', 'merchantPaymentMethodId'],
      validate: (value, args) => {
        if (!isString(value)) {
          return '$property must be a string';
        }
        if (!value) {
          return '$property should not be empty';
        }
        return;
      },
    },
    validationOptions,
  );
}
