import { Equals, IsEnum, Type, ValidateNested } from 'jovo-output';
import { PlayBehavior } from '../common/OutputSpeech';
import { Directive } from '../Directive';
import { AudioItem } from './AudioItem';

export class AudioPlayerPlayDirective extends Directive<'AudioPlayer.Play'> {
  @Equals('AudioPlayer.Play')
  type: 'AudioPlayer.Play';

  @IsEnum(PlayBehavior)
  playBehavior: PlayBehavior;

  @ValidateNested()
  @Type(() => AudioItem)
  audioItem: AudioItem;
}
