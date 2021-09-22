import { IsOptional, JovoResponse, Type, ValidateNested } from '@jovotech/output';
import { Device } from './Device';
import { Expected } from './Expected';
import { Home } from './Home';
import { Prompt } from './Prompt';
import { Scene } from './Scene';
import { Session } from './Session';
import { User } from './User';

export class GoogleAssistantResponse extends JovoResponse {
  [key: string]: unknown;

  @IsOptional()
  @ValidateNested()
  @Type(() => Prompt)
  prompt?: Prompt;

  @IsOptional()
  @ValidateNested()
  @Type(() => Scene)
  scene?: Scene;

  @IsOptional()
  @ValidateNested()
  @Type(() => Session)
  session?: Session;

  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  user?: User;

  @IsOptional()
  @ValidateNested()
  @Type(() => Home)
  home?: Home;

  @IsOptional()
  @ValidateNested()
  @Type(() => Device)
  device?: Device;

  @IsOptional()
  @ValidateNested()
  @Type(() => Expected)
  expected?: Expected;

  hasSessionEnded(): boolean {
    return this.scene?.next?.name === 'actions.scene.END_CONVERSATION';
  }
}
