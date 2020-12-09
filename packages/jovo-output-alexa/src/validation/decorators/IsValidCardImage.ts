import {
  isDefined,
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
} from 'jovo-output';
import { Card, CardType } from '../../models/Card';
import { CardImage } from '../../models/CardImage';

export function IsValidCardImage(
  relatedTypes: CardType[],
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object: any, propertyKey: string | symbol) {
    registerDecorator({
      name: 'isValidCardImage',
      target: object.constructor,
      propertyName: propertyKey.toString(),
      constraints: [],
      options,
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const type = (args.object as Card).type;
          // if there is no type, skip for now because another decorator should take care of that
          if (!type) {
            return true;
          }

          if (isDefined(value) && !relatedTypes.includes(type)) {
            args.constraints[0] = `$property can not be set when the type is ${type}`;
            return false;
          }

          if (isDefined(value)) {
            if (!(value instanceof CardImage)) {
              args.constraints[0] = '$property must be an instance of CardImage';
              return false;
            }

            const errors = await validate(value);
            // TODO: implement message
            args.constraints[0] = 'TBD';
            return !errors.length;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return args.constraints[0];
        },
      },
    });
  };
}
