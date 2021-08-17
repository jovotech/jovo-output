import {
  ArrayMaxSize,
  formatValidationErrors,
  IsArray,
  IsBoolean,
  IsEitherValid,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Type,
  validate,
  ValidateNested,
} from '@jovotech/output';
import { SUGGESTIONS_MAX_SIZE } from '../constants';
import { GoogleBusinessResponse } from './GoogleBusinessResponse';
import { Image } from './Image';
import { Representative } from './Representative';
import { RichCard } from './RichCard';
import { Suggestion } from './Suggestion';

export class GoogleBusinessOutputTemplateResponse implements Partial<GoogleBusinessResponse> {
  [key: string]: unknown;

  @IsOptional()
  @IsString()
  @Matches('conversations[/].*[/]messages[/].*[^/]')
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  messageId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Representative)
  representative?: Representative;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(SUGGESTIONS_MAX_SIZE)
  @ValidateNested({ each: true })
  @Type(() => Suggestion)
  suggestions?: Suggestion[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fallback?: string;

  @IsOptional()
  @IsBoolean()
  containsRichText?: boolean;

  @IsOptional()
  @IsEitherValid<GoogleBusinessResponse>({
    name: 'isValidGoogleBusinessResponseContent',
    keys: ['text', 'image', 'richCard'],
    validate: async (value, args) => {
      if (typeof value !== 'string') {
        return '$property must be a string';
      }
      if (!value) {
        return '$property should not be empty';
      }
      return;
    },
  })
  text?: string;

  @IsOptional()
  @IsEitherValid<GoogleBusinessResponse>({
    name: 'isValidGoogleBusinessResponseContent',
    keys: ['text', 'image', 'richCard'],
    validate: async (value, args) => {
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
  @IsEitherValid<GoogleBusinessResponse>({
    name: 'isValidGoogleBusinessResponseContent',
    keys: ['text', 'image', 'richCard'],
    validate: async (value, args) => {
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
  @Type(() => RichCard)
  richCard?: RichCard;
}
