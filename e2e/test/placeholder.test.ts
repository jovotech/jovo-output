import { OutputTemplate, OutputTemplateConverter } from '@jovotech/output';
import { AlexaOutputConverterStrategy } from '@jovotech/output-alexa';

const outputConverter = new OutputTemplateConverter(new AlexaOutputConverterStrategy());

const output: OutputTemplate = {
  message: "What's your name?",
  reprompt: "What's your name/",

  Alexa: {},
};

test('placeholder', async () => {
  expect(true).toBe(true);
});
