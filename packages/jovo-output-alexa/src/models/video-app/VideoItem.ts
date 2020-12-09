import { IsOptional, IsUrl, Type, ValidateNested } from 'jovo-output';
import { Metadata } from '../common/Metadata';

export class VideoItem {
  @IsUrl({ protocols: ['https'] })
  source: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Metadata)
  metadata?: Metadata;
}
