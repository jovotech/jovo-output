import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Type,
  ValidateIf,
  ValidateNested,
} from 'jovo-output';
import { Image } from '../common/Image';
import { Action } from './Action';
import { Disclosure } from './Disclosure';
import { Merchant } from './Merchant';
import { PriceAttribute } from './PriceAttribute';
import { PurchaseItemExtension } from './PurchaseItemExtension';
import { ReservationItemExtension } from './ReservationItemExtension';
import { UserInfo } from './UserInfo';

export class LineItem {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Merchant)
  provider?: Merchant;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => PriceAttribute)
  priceAttributes?: PriceAttribute[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => Action)
  followUpActions?: Action[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => UserInfo)
  recipients?: UserInfo[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image?: Image;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MaxLength(1000, { each: true })
  notes?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Disclosure)
  disclosures?: Disclosure[];

  @ValidateIf((o) => !o.reservation)
  @ValidateNested()
  @Type(() => PurchaseItemExtension)
  purchase: PurchaseItemExtension;

  @ValidateIf((o) => !o.purchase)
  @ValidateNested()
  @Type(() => ReservationItemExtension)
  reservation: ReservationItemExtension;
}