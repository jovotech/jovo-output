import { IsBoolean, IsInt, IsUrl } from 'jovo-output';

export class PurchaseReturnsInfo {
  @IsBoolean()
  isReturnable: boolean;

  @IsInt()
  daysToReturn: number;

  @IsUrl()
  policyUrl: string;
}
