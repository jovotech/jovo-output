import { IsEnum } from 'jovo-output';
import { IsValidAlexaString } from '../../validation/decorators/IsValidAlexaString';

export enum DisplayTemplateTextContentItemType {
  Plain = 'PlainText',
  Rich = 'RichText',
}

export class TextContentItem {
  @IsEnum(DisplayTemplateTextContentItemType)
  type: DisplayTemplateTextContentItemType;

  @IsValidAlexaString()
  text: string;
}
