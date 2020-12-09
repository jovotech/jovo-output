import { isDefined, registerDecorator, ValidationArguments, ValidationOptions } from 'jovo-output';
import { Card, CardType } from '../../models/Card';

export function IsValidCardString(
  relatedTypes: CardType[],
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object: any, propertyKey: string | symbol) {
    registerDecorator({
      name: 'isValidCardString',
      target: object.constructor,
      propertyName: propertyKey.toString(),
      constraints: [],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
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
            if (typeof value !== 'string') {
              args.constraints[0] = '$property must be a string';
              return false;
            }

            if (!value) {
              args.constraints[0] = '$property should not be empty';
              return false;
            }
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
