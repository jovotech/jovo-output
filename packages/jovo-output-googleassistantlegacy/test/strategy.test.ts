import {
  GenericCard,
  GenericOutput,
  Message,
  OutputConverter,
  OutputValidationError,
  toSSML,
} from 'jovo-output';
import {
  GoogleAssistantOutputConverterStrategy,
  GoogleAssistantResponse,
  SimpleResponse,
} from '../src';

const outputConverter = new OutputConverter(new GoogleAssistantOutputConverterStrategy());

async function convertAndExpectToEqual(
  output: GenericOutput,
  expectedResponse: GoogleAssistantResponse,
) {
  expect(await outputConverter.toResponse(output)).toEqual(expectedResponse);
}

describe('toResponse', () => {
  describe('output.message', () => {
    test('output.message is string', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
        },
        {
          richResponse: {
            items: [
              {
                simpleResponse: {
                  ssml: toSSML('foo'),
                },
              },
            ],
          },
        },
      );
    });
    test('output.message is GenericMessage', () => {
      return convertAndExpectToEqual(
        {
          message: {
            text: 'foo',
            displayText: 'bar',
          },
        },
        {
          richResponse: {
            items: [
              {
                simpleResponse: {
                  ssml: toSSML('foo'),
                  displayText: 'bar',
                },
              },
            ],
          },
        },
      );
    });
    test('output.GoogleAssistant.message overwrites output.message', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          GoogleAssistant: {
            message: 'bar',
          },
        },
        {
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('bar') } }],
          },
        },
      );
    });
  });

  describe('output.reprompt', () => {
    test('output.reprompt is set but not output.message', () => {
      return expect(
        outputConverter.toResponse({
          reprompt: 'foo',
        }),
      ).rejects.toThrowError(OutputValidationError);
    });
    test('output.reprompt is string', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          reprompt: 'bar',
        },
        {
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
          noInputPrompts: [{ ssml: toSSML('bar') }],
        },
      );
    });
    test('output.reprompt is GenericMessage', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          reprompt: {
            text: 'bar',
            displayText: 'test',
          },
        },
        {
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
          noInputPrompts: [{ ssml: toSSML('bar'), displayText: 'test' }],
        },
      );
    });
    test('output.GoogleAssistant.reprompt overwrites output.reprompt', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          reprompt: 'bar',
          GoogleAssistant: {
            reprompt: 'foo',
          },
        },
        {
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
          noInputPrompts: [{ ssml: toSSML('foo') }],
        },
      );
    });
  });

  describe('output.listen', () => {
    test('output.listen is set but not output.message', () => {
      return expect(
        outputConverter.toResponse({
          listen: true,
        }),
      ).rejects.toThrowError(OutputValidationError);
    });
    test('output.listen is false', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          listen: false,
        },
        {
          expectUserResponse: false,
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
        },
      );
    });
    test('output.listen is true', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          listen: true,
        },
        {
          expectUserResponse: true,
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
        },
      );
    });
    test('output.GoogleAssistant.listen overwrites output.listen', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          listen: true,
          GoogleAssistant: {
            listen: false,
          },
        },
        {
          expectUserResponse: false,
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
        },
      );
    });
  });

  describe('output.quickReplies', () => {
    test('output.quickReplies is set but not output.message', () => {
      return expect(
        outputConverter.toResponse({
          quickReplies: [],
        }),
      ).rejects.toThrowError(OutputValidationError);
    });
    test('output.quickReplies is array of string and GenericQuickReply', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          quickReplies: ['hello', { text: 'world' }],
        },
        {
          richResponse: {
            suggestions: [{ title: 'hello' }, { title: 'world' }],
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
        },
      );
    });
    test('output.GoogleAssistant.quickReplies overwrites output.quickReplies', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          quickReplies: ['hello'],
          GoogleAssistant: {
            quickReplies: ['world'],
          },
        },
        {
          richResponse: {
            suggestions: [{ title: 'world' }],
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
        },
      );
    });
  });

  describe('output.card', () => {
    test('output.card is set but not output.message', () => {
      return expect(
        outputConverter.toResponse({
          card: {
            title: 'foo',
            subtitle: 'bar',
          },
        }),
      ).rejects.toThrowError(OutputValidationError);
    });
    test('output.card is set without image and subtitle', () => {
      return expect(
        outputConverter.toResponse({
          message: 'foo',
          card: {
            title: 'foo',
          },
        }),
      ).rejects.toThrowError(OutputValidationError);
    });
    test('output.card is set with subtitle', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          card: {
            title: 'foo',
            subtitle: 'bar',
          },
        },
        {
          richResponse: {
            items: [
              { simpleResponse: { ssml: toSSML('foo') } },
              { basicCard: { title: 'foo', formattedText: 'bar' } },
            ],
          },
        },
      );
    });
    test('output.card is set with image', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          card: {
            title: 'foo',
            imageUrl: 'https://via.placeholder.com/150',
          },
        },
        {
          richResponse: {
            items: [
              { simpleResponse: { ssml: toSSML('foo') } },
              {
                basicCard: {
                  title: 'foo',
                  image: { url: 'https://via.placeholder.com/150', accessibilityText: 'foo' },
                },
              },
            ],
          },
        },
      );
    });
    test('output.card is set with image and subtitle', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          card: {
            title: 'foo',
            subtitle: 'bar',
            imageUrl: 'https://via.placeholder.com/150',
          },
        },
        {
          richResponse: {
            items: [
              { simpleResponse: { ssml: toSSML('foo') } },
              {
                basicCard: {
                  title: 'foo',
                  formattedText: 'bar',
                  image: { url: 'https://via.placeholder.com/150', accessibilityText: 'foo' },
                },
              },
            ],
          },
        },
      );
    });
    test('output.GoogleAssistant.card overwrites output.card', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          card: {
            title: 'foo',
            subtitle: 'bar',
          },
          GoogleAssistant: {
            card: {
              title: 'overwritten',
              subtitle: 'overwritten',
            },
          },
        },
        {
          richResponse: {
            items: [
              { simpleResponse: { ssml: toSSML('foo') } },
              {
                basicCard: {
                  title: 'overwritten',
                  formattedText: 'overwritten',
                },
              },
            ],
          },
        },
      );
    });
  });

  describe('output.carousel', () => {
    test('output.carousel is set but not output.message', () => {
      return expect(
        outputConverter.toResponse({
          carousel: {
            items: [
              {
                title: 'foo',
                subtitle: 'bar',
              },
              {
                title: 'bar',
                subtitle: 'foo',
              },
            ],
          },
        }),
      ).rejects.toThrowError(OutputValidationError);
    });

    test('output.carousel is set and has fewer than 2 items - failure', () => {
      return expect(
        outputConverter.toResponse({
          message: 'foo',
          carousel: {
            items: [{ title: 'foo', subtitle: 'bar' }],
          },
        }),
      ).rejects.toThrowError(OutputValidationError);
    });

    test('output.carousel is set and has 2 or more items', () => {
      return convertAndExpectToEqual(
        {
          message: 'foo',
          carousel: {
            items: [
              { title: 'foo', subtitle: 'bar', key: 'test' },
              { title: 'bar', subtitle: 'foo' },
            ],
          },
        },
        {
          systemIntent: {
            intent: 'actions.intent.OPTION',
            data: {
              '@type': 'type.googleapis.com/google.actions.v2.OptionValueSpec',
              'carouselSelect': {
                items: [
                  {
                    optionInfo: {
                      key: 'test',
                      synonyms: [],
                    },
                    title: 'foo',
                    description: 'bar',
                  },
                  {
                    optionInfo: {
                      key: 'bar',
                      synonyms: [],
                    },
                    title: 'bar',
                    description: 'foo',
                  },
                ],
              },
            },
          },
          richResponse: {
            items: [{ simpleResponse: { ssml: toSSML('foo') } }],
          },
        },
      );
    });

    test('output.carousel is set and has more than 10 items - failure', () => {
      return expect(
        outputConverter.toResponse({
          message: 'foo',
          carousel: {
            items: ([] as GenericCard[]).fill({ title: 'foo', subtitle: 'bar' }, 0, 10),
          },
        }),
      ).rejects.toThrowError(OutputValidationError);
    });
  });
});
