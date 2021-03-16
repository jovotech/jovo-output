import { GenericOutput, OutputConverter } from '@jovotech/output';
import { AlexaOutputConverterStrategy } from '@jovotech/output-alexa';

const outputConverter = new OutputConverter(new AlexaOutputConverterStrategy());

const output: GenericOutput = {
  message: "What's your name?",
  reprompt: "What's your name/",

  Alexa: {},
};

test('placeholder', async () => {
  expect(true).toBe(true);
});
