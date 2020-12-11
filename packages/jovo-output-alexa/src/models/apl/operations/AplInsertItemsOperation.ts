import { Equals, IsObject } from 'jovo-output';
import { IsArray } from 'jovo-output';
import { AplOperation, AplOperationType } from '../AplOperation';

export class AplInsertItemsOperation extends AplOperation<AplOperationType.InsertItems> {
  @Equals('AplOperationType.InsertItems')
  type: AplOperationType.InsertItems;

  @IsArray()
  @IsObject({ each: true })
  items: Record<string, unknown>[];
}
