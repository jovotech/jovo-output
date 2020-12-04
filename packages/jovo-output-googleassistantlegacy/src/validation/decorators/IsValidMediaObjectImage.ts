import {
  isDefined,
  isString,
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
} from 'jovo-output';
import { Image, MediaObject, SimpleResponse } from '../../models';
import { IsEitherValid } from './IsEitherValid';

export function IsValidMediaObjectImage(validationOptions?: ValidationOptions): PropertyDecorator {
  return IsEitherValid<MediaObject>(
    {
      name: 'isValidMediaObjectImage',
      keys: ['largeImage', 'icon'],
      validate: async (value, args) => {
        if (!(value instanceof Image)) {
          return `$property has to be an instance of Image`;
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
