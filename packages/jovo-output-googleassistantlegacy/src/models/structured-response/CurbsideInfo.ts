import { IsEnum, Type, ValidateNested } from 'jovo-output';
import { Vehicle } from './Vehicle';

export enum CurbsideFulfillmentType {
  Unspecified = 'UNSPECIFIED',
  VehicleDetail = 'VEHICLE_DETAIL',
}

export class CurbsideInfo {
  @IsEnum(CurbsideFulfillmentType)
  curbsideFulfillmentType: CurbsideFulfillmentType;

  @ValidateNested()
  @Type(() => Vehicle)
  userVehicle: Vehicle;
}
