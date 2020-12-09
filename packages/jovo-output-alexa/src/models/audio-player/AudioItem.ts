import { IsOptional, Type, ValidateNested } from 'jovo-output';
import { AudioItemMetadata } from './AudioItemMetadata';
import { AudioItemStream } from './AudioItemStream';

export class AudioItem {
  @ValidateNested()
  @Type(() => AudioItemStream)
  stream: AudioItemStream;

  @IsOptional()
  @ValidateNested()
  @Type(() => AudioItemMetadata)
  metadata?: AudioItemMetadata;
}
