import {
  formatValidationErrors,
  IsArray,
  IsEitherValid,
  IsOptional,
  IsString,
  MaxLength,
  Type,
  validate,
  ValidateNested,
} from '@jovotech/output';
import { MESSAGE_TEXT_MAX_LENGTH, PAYLOAD_MAX_LENGTH } from '../../constants';
import { TransformQuickReply } from '../../decorators/transformation/TransformQuickReply';
import { QuickReply } from '../quick-reply/QuickReply';
import { MessageAttachment } from './MessageAttachment';

export class Message {
  @IsEitherValid<Message>({
    keys: ['text', 'attachment'],
    validate: (value, args) => {
      if (typeof value !== 'string') {
        return '$property must be a string';
      }
      if (!value) {
        return '$property should not be empty';
      }
      if (value.length > MESSAGE_TEXT_MAX_LENGTH) {
        return `$property can not exceed ${MESSAGE_TEXT_MAX_LENGTH} characters`;
      }
      return;
    },
  })
  text?: string;

  @IsEitherValid<Message>({
    keys: ['text', 'attachment'],
    validate: async (value, args) => {
      if (!(value instanceof MessageAttachment)) {
        return '$property must be an instance of MessageAttachment';
      }
      const errors = await validate(value);
      if (errors.length) {
        return formatValidationErrors(errors, {
          text: '$property is invalid:',
          delimiter: '\n  - ',
          path: '$property',
        });
      }
    },
  })
  @Type(() => MessageAttachment)
  attachment?: MessageAttachment;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @TransformQuickReply()
  quick_replies?: QuickReply[];

  @IsOptional()
  @IsString()
  @MaxLength(PAYLOAD_MAX_LENGTH)
  metadata?: string;
}
