import { Type, ValidateNested } from 'jovo-output';
import { OrderUpdate } from './OrderUpdate';

export class StructuredResponse {
  @ValidateNested()
  @Type(() => OrderUpdate)
  orderUpdateV3: OrderUpdate;
}
