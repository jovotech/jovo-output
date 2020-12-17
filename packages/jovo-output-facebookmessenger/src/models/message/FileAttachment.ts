import { IsBoolean, IsOptional, IsUrl } from 'jovo-output';

export class FileAttachment {
  [key: string]: unknown;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsBoolean()
  is_reusable?: boolean;
}
