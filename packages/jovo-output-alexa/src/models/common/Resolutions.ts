import { IsArray, IsOptional, Type, ValidateNested } from 'jovo-output';
import { ResolutionPerAuthority } from './ResolutionPerAuthority';

export class Resolutions {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResolutionPerAuthority)
  resolutionsPerAuthority?: ResolutionPerAuthority[];
}
