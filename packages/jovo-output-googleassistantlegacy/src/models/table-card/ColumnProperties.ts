import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'jovo-output';

export enum HorizontalAlignment {
  Leading = 'LEADING',
  Center = 'CENTER',
  Trailing = 'TRAILING',
}

export class ColumnProperties {
  @IsString()
  @IsNotEmpty()
  header: string;

  @IsOptional()
  @IsEnum(HorizontalAlignment)
  horizontalAlignment?: HorizontalAlignment;
}
