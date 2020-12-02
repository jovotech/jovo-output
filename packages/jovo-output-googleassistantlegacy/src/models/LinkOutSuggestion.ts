import { IsNotEmpty, IsString, MaxLength, Type, ValidateNested } from 'jovo-output';
import { OpenUrlAction } from './common/OpenUrlAction';

export class LinkOutSuggestion {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  destinationName: string;

  @ValidateNested()
  @Type(() => OpenUrlAction)
  openUrlAction: OpenUrlAction;
}
