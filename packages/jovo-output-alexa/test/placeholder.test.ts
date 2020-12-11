import { plainToClass, validate, ValidationOptions } from 'jovo-output';
import { OutputValidationError } from 'jovo-output/dist';
import { Card, CardType } from '../src';

function transformAndValidate<T extends Record<string, any> = Record<string, any>>(
  objClass: new () => T,
  obj: T,
  options?: ValidationOptions,
) {
  return validate(plainToClass(objClass, obj), options);
}

test('placeholder', async () => {
  const errors = await transformAndValidate<Card<CardType.Standard>>(Card, {
    type: CardType.Standard,
    title: 'test',
    text: 'testi',
    image: {
      abc: '',
    } as any,
  });
  if (errors.length) {
    throw new OutputValidationError(errors, 'test');
  }
  console.log(errors);

  expect(true).toBe(true);
});
