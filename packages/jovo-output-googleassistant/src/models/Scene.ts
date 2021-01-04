import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from 'jovo-output';

export enum SlotFillingStatus {
  Unspecified = 'UNSPECIFIED',
  Initialized = 'INITIALIZED',
  Collecting = 'COLLECTING',
  Final = 'FINAL',
}

export class Scene {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(SlotFillingStatus)
  slotFillingStatus: SlotFillingStatus;

  @IsObject()
  @IsString({ each: true })
  slots: Record<string, string>;

  @IsOptional()
  @ValidateNested()
  @Type(() => NextScene)
  next?: NextScene;
}

export class NextScene {
  @IsString()
  @IsNotEmpty()
  name: string;
}
