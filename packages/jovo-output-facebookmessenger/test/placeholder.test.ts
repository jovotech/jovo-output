import { plainToClass, validate, ValidationOptions } from 'jovo-output';
import { Message } from '../src/models/message/Message';
import { MessageAttachmentType } from '../src/models/message/MessageAttachment';
import { TemplateType } from '../src/models/template/Template';

function transformAndValidate<T extends Record<string, any> = Record<string, any>>(
  objClass: new () => T,
  obj: T,
  options?: ValidationOptions,
) {
  return validate(plainToClass(objClass, obj), options);
}

test('placeholder', async () => {
  const val: Message = {
    attachment: {
      type: MessageAttachmentType.Template,
      payload: {
        template_type: TemplateType.Generic,
        elements: [
          {
            title: 'Welcome!',
            image_url: 'https://petersfancybrownhats.com/company_image.png',
            subtitle: 'We have the right hat for everyone.',
            default_action: {
              type: 'web_url',
              url: 'https://petersfancybrownhats.com/view?item=103',
              webview_height_ratio: 'tall',
            },
            buttons: [
              {
                type: 'web_url',
                url: 'https://petersfancybrownhats.com',
                title: 'View Website',
              },
              {
                type: 'postback',
                title: 'Start Chatting',
                payload: 'DEVELOPER_DEFINED_PAYLOAD',
              },
            ],
          },
        ],
      },
    },
  };
  const abc = plainToClass(Message, val);

  expect(true).toBe(true);
});
