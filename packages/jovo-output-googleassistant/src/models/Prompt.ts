import { IsArray, IsBoolean, IsObject, IsOptional, Type, ValidateNested } from 'jovo-output';
import { Link } from './common/Link';
import { Suggestion } from './common/Suggestion';
import { Canvas } from './prompt/Canvas';
import { Content } from './prompt/Content';
import { Simple } from './prompt/Simple';

export class Prompt {
  @IsOptional()
  @IsBoolean()
  override?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => Simple)
  firstSimple?: Simple;

  @IsOptional()
  @ValidateNested()
  @Type(() => Content)
  content?: Content;

  @IsOptional()
  @ValidateNested()
  @Type(() => Simple)
  lastSimple?: Simple;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Suggestion)
  suggestions?: Suggestion[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Link)
  link?: Link;

  @IsOptional()
  @ValidateNested()
  @Type(() => Canvas)
  canvas?: Canvas;

  @IsOptional()
  @IsObject()
  orderUpdate?: any;
}
