import { registerDecorator, ValidationArguments, ValidationOptions } from 'jovo-output';
import { OutputSpeech, OutputSpeechType } from '../../models/OutputSpeech';

export function IsValidOutputSpeechString(
  relatedType: OutputSpeechType,
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object: any, propertyKey: string | symbol) {
    registerDecorator({
      name: 'isValidOutputSpeechString',
      target: object.constructor,
      propertyName: propertyKey.toString(),
      constraints: [],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const type = (args.object as OutputSpeech).type;
          // if there is no type, skip for now because another decorator should take care of that
          if (!type) {
            return true;
          }
          if (type === relatedType) {
            if (typeof value !== 'string') {
              args.constraints[0] = '$property must be a string';
              return false;
            }
            if (!value) {
              args.constraints[0] = '$property should not be empty';
              return false;
            }
          } else if (value) {
            args.constraints[0] = `$property can not be set when the type is ${type}`;
            return false;
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
