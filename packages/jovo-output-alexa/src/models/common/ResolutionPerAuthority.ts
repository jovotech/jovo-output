import { IsArray, IsNotEmpty, IsString, Type, ValidateNested } from 'jovo-output';
import { ResolutionPerAuthorityStatus } from './ResolutionPerAuthorityStatus';
import { ResolutionPerAuthorityValue } from './ResolutionPerAuthorityValue';

export class ResolutionPerAuthority {
  @IsString()
  @IsNotEmpty()
  authority: string;

  @ValidateNested()
  @Type(() => ResolutionPerAuthorityStatus)
  status: ResolutionPerAuthorityStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResolutionPerAuthorityValue)
  values: ResolutionPerAuthorityValue[];
}
