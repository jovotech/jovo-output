import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from 'jovo-output';

export enum AccountLinkingStatus {
  Unspecified = 'ACCOUNT_LINKING_STATUS_UNSPECIFIED',
  NotLinked = 'NOT_LINKED',
  Linked = 'LINKED',
}

export enum UserVerificationStatus {
  Unspecified = 'USER_VERIFICATION_STATUS_UNSPECIFIED',
  Guest = 'GUEST',
  Verified = 'VERIFIED',
}

export class User {
  @IsString()
  @IsNotEmpty()
  locale: string;

  @IsOptional()
  @IsObject()
  @IsString({ each: true })
  params?: Record<string, string>;

  @IsEnum(AccountLinkingStatus)
  accountLinkingStatus: AccountLinkingStatus;

  @IsEnum(UserVerificationStatus)
  verificationStatus: UserVerificationStatus;

  @IsString()
  @IsNotEmpty()
  lastSeenTime: string;

  @ValidateNested()
  @Type(() => Engagement)
  engagement: Engagement;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageEntitlements)
  packageEntitlements: PackageEntitlements[];
}

export class Engagement {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IntentSubscription)
  pushNotificationIntents: IntentSubscription[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IntentSubscription)
  dailyUpdateIntents: IntentSubscription[];
}

export class IntentSubscription {
  @IsString()
  @IsNotEmpty()
  intent: string;

  @IsString()
  @IsNotEmpty()
  contentTitle: string;
}

export class PackageEntitlements {
  @IsString()
  @IsNotEmpty()
  packageName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Entitlement)
  entitlements: Entitlement[];
}

export enum SkuType {
  Unspecified = 'SKU_TYPE_UNSPECIFIED',
  InApp = 'IN_APP',
  Subscription = 'SUBSCRIPTION',
  App = 'APP',
}

export class Entitlement {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsEnum(SkuType)
  skuType: SkuType;

  @ValidateNested()
  @Type(() => SignedData)
  inAppDetails: SignedData;
}

export class SignedData {
  @IsObject()
  inAppPurchaseData: Record<string, unknown>;
  @IsString()
  @IsNotEmpty()
  inAppDataSignature: string;
}
