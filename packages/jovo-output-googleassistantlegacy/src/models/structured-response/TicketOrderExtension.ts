import { Type, ValidateNested } from 'jovo-output';
import { TicketEvent } from './TicketEvent';

export class TicketOrderExtension {
  @ValidateNested()
  @Type(() => TicketEvent)
  ticketEvent: TicketEvent;
}
