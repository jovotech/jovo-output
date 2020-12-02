import { IsLatitude, IsLongitude } from 'jovo-output';

export class LatLng {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
