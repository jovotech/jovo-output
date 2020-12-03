import {
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationError,
  ValidationOptions,
} from '../..';

export function IsInstanceOrString(
  classType: new () => any,
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object: any, propertyKey: string | symbol) {
    registerDecorator({
      name: 'isInstanceOrString',
      target: object.constructor,
      propertyName: propertyKey.toString(),
      constraints: [classType],
      options,
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (typeof value === 'string' && value.length) {
            return true;
          } else if (value instanceof args.constraints[0]) {
            const errors = await validate(value);
            args.constraints[1] = errors;
            return !errors.length;
          }
          const error = new ValidationError();
          error.target = object;
          error.property = propertyKey.toString();
          error.value = value;
          error.constraints = {
            isValidMessage: `$property should either be a non-empty string or a valid ${args.constraints[0].name}-instance`,
          };
          error.children = [];
          args.constraints[1] = [error];
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          const each = options?.each || false;
          const eachText = each ? 'each item in ' : '';
          const errors: ValidationError[] = args.constraints[1];
          if (!errors?.length) {
            return `${eachText}$property should either be a non-empty string or a valid ${args.constraints[0].name}-instance`;
          }
          const errorText = errors
            .map((error) => {
              return Object.values(error.constraints || {});
            })
            .join(', ');
          return `$property is invalid: ${eachText}${errorText}`;
        },
      },
    });
  };
}
