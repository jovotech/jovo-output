import { IsNotEmpty, IsString } from 'jovo-output';

export class TelephonyPlayAudio {
  @IsString()
  @IsNotEmpty()
  audio_uri: string;
}
