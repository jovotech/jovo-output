import {
  formatValidationErrors,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsSomeValid,
  isString,
  IsString,
  Type, validate,
  ValidateNested,
} from 'jovo-output';
import { Image, ImageFill } from '../common/Image';
import { Link } from '../common/Link';

export class Card {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subtitle?: string;

  @IsSomeValid<Card>({
    keys: ['text', 'image'],
    validate: (value, args) => {
      if (!isString(value)) {
        return '$property must be a string';
      }
      if (!value) {
        return '$property should not be empty';
      }
      return;
    },
  })
  text?: string;

  @IsSomeValid<Card>({
    keys: ['text', 'image'],
    validate: async (value, args) => {
      if (!(value instanceof Image)) {
        return `$property has to be an instance of Image`;
      }

      const errors = await validate(value);
      if (errors.length) {
        return formatValidationErrors(errors, {
          text: '$property is invalid:',
          delimiter: '\n  - ',
          path: '$property',
        });
      }
      return;
    },
  })
  @Type(() => Image)
  image?: Image;

  @IsOptional()
  @IsEnum(ImageFill)
  imageFill?: ImageFill;

  @IsOptional()
  @ValidateNested()
  @Type(() => Link)
  button?: Link;
}
