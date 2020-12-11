import { Equals, Type, ValidateNested } from 'jovo-output';
import { Directive } from '../Directive';
import { VideoItem } from './VideoItem';

export class VideoAppLaunchDirective extends Directive<'VideoApp.Launch'> {
  @Equals('VideoApp.Launch')
  type: 'VideoApp.Launch';

  @ValidateNested()
  @Type(() => VideoItem)
  videoItem: VideoItem;
}