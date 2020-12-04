import { validate, ValidationOptions } from 'jovo-output';
import {
  Order,
  PurchaseItemExtension,
  PurchaseOrderExtension,
  ReservationItemExtension,
  TicketOrderExtension,
} from '../../models';
import { IsEitherValid } from './IsEitherValid';

export function IsValidOrderExtension(validationOptions?: ValidationOptions): PropertyDecorator {
  return IsEitherValid<Order>(
    {
      name: 'isValidOrderExtension',
      keys: ['purchase', 'ticket'],
      validate: async (value, args) => {
        const classType =
          args.property === 'purchase' ? PurchaseOrderExtension : TicketOrderExtension;

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
