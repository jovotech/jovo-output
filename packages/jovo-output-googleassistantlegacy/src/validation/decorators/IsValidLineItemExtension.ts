import { IsEitherValid, validate, ValidationOptions } from 'jovo-output';
import { LineItem, PurchaseItemExtension, ReservationItemExtension } from '../../models';

export function IsValidLineItemExtension(validationOptions?: ValidationOptions): PropertyDecorator {
  return IsEitherValid<LineItem>(
    {
      name: 'isValidLineItemExtension',
      keys: ['purchase', 'reservation'],
      validate: async (value, args) => {
        const classType =
          args.property === 'purchase' ? PurchaseItemExtension : ReservationItemExtension;

        if (!(value instanceof classType)) {
          return `$property has to be an instance of ${classType.name}`;
        }

        const errors = await validate(value);
        if (errors.length) {
          // TODO: build error message based on errors
          return `TBD`;
        }
        return;
      },
    },
    validationOptions,
  );
}
