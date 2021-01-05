import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from 'jovo-output';

export class Scene {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  slots: Record<string, unknown>;

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
