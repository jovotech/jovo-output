import { IsValidCardImageUrl } from '../../validation/decorators/IsValidCardImageUrl';

export class CardImage {
  @IsValidCardImageUrl()
  smallImageUrl?: string;

  @IsValidCardImageUrl()
  largeImageUrl?: string;
}
