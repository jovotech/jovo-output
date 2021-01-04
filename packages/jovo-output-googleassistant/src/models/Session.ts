import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from 'jovo-output';
import { TypeOverride } from './common/TypeOverride';

export class Session {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  params: Record<string, string>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TypeOverride)
  typeOverrides?: TypeOverride[];

  @IsString()
  @IsNotEmpty()
  languageCode: string;
}
