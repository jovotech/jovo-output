import { IsEnum, IsOptional, IsUrl, Type, ValidateNested } from 'jovo-output';
import { AndroidApp } from './AndroidApp';

export enum UrlTypeHint {
  Unspecified = 'URL_TYPE_HINT_UNSPECIFIED',
  AMP = 'AMP_CONTENT',
}

export class OpenUrlAction {
  @IsUrl()
  url: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AndroidApp)
  androidApp?: AndroidApp;

  @IsOptional()
  @IsEnum(UrlTypeHint)
  urlTypeHint?: UrlTypeHint;
}
