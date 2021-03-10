import { GenericOutput, OutputConverter } from 'jovo-output';
import { AlexaOutputConverterStrategy } from '../../packages/jovo-output-alexa';

const outputConverter = new OutputConverter(new AlexaOutputConverterStrategy());

const output: GenericOutput = {
  message: "What's your name?",
  reprompt: "What's your name/",

  Alexa: {},
};

test('placeholder', async () => {
  expect(true).toBe(true);
});
