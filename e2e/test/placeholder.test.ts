import { Output } from 'jovo-output';
import { GoogleAssistantOutputStrategy } from 'jovo-output-googleassistantlegacy';

test('placeholder', async () => {
  const output = new Output(new GoogleAssistantOutputStrategy());

  await expect(
    output.convert({
      quickReplies: 2 as any,
    }),
  ).rejects.toBeInstanceOf(Error);

  expect(true).toBe(true);
});
