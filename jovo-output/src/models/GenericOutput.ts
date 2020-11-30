import { Type } from 'class-transformer';
import {
  GenericCard,
  GenericCarousel,
  GenericMessage,
  IsBoolean,
  IsOptional,
  Message,
  ValidateNested,
} from '../index';

export class GenericOutput {
  [key: string]: unknown;

  @IsOptional()
  // TODO: add validation
  @Type(() => GenericMessage)
  message?: Message;

  @IsOptional()
  // TODO: add validation
  @Type(() => GenericMessage)
  reprompt?: Message;

  @IsOptional()
  @IsBoolean()
  listen?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => GenericCard)
  card?: GenericCard;

  @IsOptional()
  @ValidateNested()
  @Type(() => GenericCarousel)
  carousel?: GenericCarousel;
}
