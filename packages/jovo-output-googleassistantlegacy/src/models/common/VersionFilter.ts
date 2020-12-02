import { IsInt, IsOptional } from 'jovo-output';

export class VersionFilter {
  @IsOptional()
  @IsInt()
  minVersion?: number;
  @IsOptional()
  @IsInt()
  maxVersion?: number;
}
