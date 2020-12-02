import { IsNotEmpty, IsString, Type, ValidateNested } from 'jovo-output';
import { OpenUrlAction } from './OpenUrlAction';

export class Button {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested()
  @Type(() => OpenUrlAction)
  openUrlAction: OpenUrlAction;
}
