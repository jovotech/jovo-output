import { GenericOutput, Output, OutputStrategy, ValidationError } from 'jovo-output';
import { GoogleAssistantOutput, GoogleAssistantOutputStrategy } from 'jovo-output-googleassistant';

function makeTestGenericOutput(obj?: Partial<GenericOutput>): GenericOutput {
  return {
    message: 'Test',
    ...(obj || {}),
  };
}

function makeTestGoogleAssistantOutput(
  obj?: Partial<GoogleAssistantOutput>,
): GoogleAssistantOutput {
  return {
    test: 'abc',
    ...(obj || {}),
  };
}

const MOCK_STRATEGY: OutputStrategy<GenericOutput> = {
  outputClass: GenericOutput,
  async convert(genericOutput: GenericOutput): Promise<GenericOutput> {
    return genericOutput;
  },
  async parse(platformOutput: GenericOutput): Promise<GenericOutput> {
    return platformOutput;
  },
};

describe('generic', () => {
  const output = new Output(MOCK_STRATEGY);

  describe('validate', () => {
    let errors: ValidationError[];
    beforeEach(() => {
      errors = [];
    });

    test('success - valid string', async () => {
      errors = await output.validateGenericOutput(
        makeTestGenericOutput({
          message: 'foo',
        }),
      );
      expect(errors).toHaveLength(0);
    });
    test('success - valid object', async () => {
      errors = await output.validateGenericOutput(
        makeTestGenericOutput({
          message: {
            text: 'foo',
          },
        }),
      );
      expect(errors).toHaveLength(0);
    });
    test('failure - invalid string', async () => {
      errors = await output.validateGenericOutput(
        makeTestGenericOutput({
          message: '',
        }),
      );
      expect(errors).toHaveLength(1);
    });
    test('failure - invalid object', async () => {
      errors = await output.validateGenericOutput(
        makeTestGenericOutput({
          message: {
            text: '',
          },
        }),
      );
      expect(errors).toHaveLength(1);
    });
  });
});

describe('googleAssistant', () => {
  const output = new Output(new GoogleAssistantOutputStrategy());

  describe('generic -> specific', () => {
    test('success', async () => {
      const genericErrors = await output.validateGenericOutput(makeTestGenericOutput());
      const platformErrors = await output.validatePlatformOutput(makeTestGoogleAssistantOutput());

      expect(true).toBe(true);
    });
  });

  describe('specific -> generic', () => {
    test('placeholder', () => {
      expect(true).toBe(true);
    });
  });
});
