import { IsBoolean, ValidateNested, Type, IsArray } from 'jovo-output';
import { Cell } from './Cell';

export class Row {
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => Cell)
  cells: Cell[];

  @IsBoolean()
  dividerAfter: boolean;
}
