import { IsArray, IsNotEmpty, IsOptional, IsString, Type, ValidateNested } from 'jovo-output';
import { Image } from './Image';
import { OpenUrl } from './OpenUrl';

export class Entry {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  synonyms: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EntryDisplay)
  display?: EntryDisplay;
}

export class EntryDisplay {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image?: Image;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  footer?: string;

  @ValidateNested()
  @Type(() => OpenUrl)
  openUrl: OpenUrl;
}
