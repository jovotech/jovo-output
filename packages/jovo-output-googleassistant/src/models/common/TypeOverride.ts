import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from 'jovo-output';
import { Entry } from './Entry';

export enum TypeOverrideMode {
  Unspecified = 'TYPE_UNSPECIFIED',
  Replace = 'TYPE_REPLACE',
  Merge = 'TYPE_MERGE',
}

export class TypeOverride {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TypeOverrideMode)
  mode: TypeOverrideMode;

  @IsOptional()
  @ValidateNested()
  @Type(() => SynonymType)
  synonym?: SynonymType;
}

export class SynonymType {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Entry)
  entries: Entry[];
}
