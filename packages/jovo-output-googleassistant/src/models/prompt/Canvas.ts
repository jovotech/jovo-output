import { IsArray, IsBoolean, IsOptional, IsUrl } from 'jovo-output';

export class Canvas {
  @IsUrl({ protocols: ['https', 'http'] })
  url: string;

  @IsOptional()
  @IsArray()
  data?: unknown[];

  @IsOptional()
  @IsBoolean()
  suppressMic?: boolean;
}
