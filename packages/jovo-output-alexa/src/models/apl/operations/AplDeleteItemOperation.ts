import { Equals } from 'jovo-output';
import { AplOperation, AplOperationType } from '../AplOperation';

export class AplDeleteItemOperation extends AplOperation<AplOperationType.DeleteItem> {
  @Equals(AplOperationType.DeleteItem)
  type: AplOperationType.DeleteItem;
}
