import { Equals, IsInt, Min } from 'jovo-output';
import { AplOperation, AplOperationType } from '../AplOperation';

export class AplDeleteItemsOperation extends AplOperation<AplOperationType.DeleteItems> {
  @Equals(AplOperationType.DeleteItems)
  type: AplOperationType.DeleteItems;

  @IsInt()
  @Min(1)
  count: number;
}
