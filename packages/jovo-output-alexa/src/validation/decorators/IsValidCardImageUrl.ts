import { IsEitherValid, isURL, ValidationOptions } from 'jovo-output';
import { CardImage } from '../../models/CardImage';

export function IsValidCardImageUrl(options?: ValidationOptions): PropertyDecorator {
  return IsEitherValid<CardImage>(
    {
      name: 'isValidCardImageUrl',
      keys: ['smallImageUrl', 'largeImageUrl'],
      validate: async (value, args) => {
        if (!isURL(value)) {
          return '$property must be an URL address';
        }

        return;
      },
    },
    options,
  );
}
