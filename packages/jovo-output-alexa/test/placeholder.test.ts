import { plainToClass, validate, ValidationOptions } from 'jovo-output';

function transformAndValidate<T extends Record<string, any> = Record<string, any>>(
  objClass: new () => T,
  obj: T,
  options?: ValidationOptions,
) {
  console.log(plainToClass(objClass, obj));
  return validate(plainToClass(objClass, obj), options);
}

test('placeholder', async () => {
  expect(true).toBe(true);
});
