import {
  isDefined,
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
} from 'jovo-output';
import {
  DialogUpdateDynamicEntitiesDirective,
  DynamicEntitiesUpdateBehavior,
} from '../../models/dialog/DialogUpdateDynamicEntitiesDirective';

export function IsValidDynamicEntitiesSlotTypesArray(
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object, propertyKey) {
    registerDecorator({
      name: 'isValidDynamicEntitiesSlotTypesArray',
      target: object.constructor,
      propertyName: propertyKey.toString(),
      constraints: [],
      options,
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const behavior = (args.object as DialogUpdateDynamicEntitiesDirective).updateBehavior;

          if (behavior === DynamicEntitiesUpdateBehavior.Replace) {
            if (!Array.isArray(value)) {
              args.constraints[0] = '$property must be an array';
              return false;
            }
            const errors = await validate(value);
            // TODO: set actual error message
            args.constraints[0] = 'TBD';
            return !errors.length;
          } else {
            if (isDefined(value)) {
              args.constraints[0] = `$property can not be set when updateBehavior is set to ${behavior}`;
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
