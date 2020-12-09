import { Equals } from 'jovo-output';
import { Directive } from '../Directive';

export class AudioPlayerStopDirective extends Directive {
  @Equals('AudioPlayer.Stop')
  type: 'AudioPlayer.Stop';
}
