import { Equals } from 'jovo-output';
import { QuickReply, QuickReplyContentType } from './QuickReply';

export class PhoneNumberQuickReply extends QuickReply<QuickReplyContentType.PhoneNumber> {
  @Equals(QuickReplyContentType.PhoneNumber)
  content_type: QuickReplyContentType.PhoneNumber;
}
