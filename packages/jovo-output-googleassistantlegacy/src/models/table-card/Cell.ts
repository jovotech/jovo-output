import { IsNotEmpty, IsString } from 'jovo-output';

export class Cell {
  @IsString()
  @IsNotEmpty()
  text: string;
}
