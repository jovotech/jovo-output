import { Transform } from '../..';

export function TransformMap<T extends Record<string, unknown>>(
  type: new () => T,
): PropertyDecorator {
  return Transform((value) => {
    const result: Record<string, T> = {};
    const entries = Object.entries<T>(value);
    for (let i = 0, len = entries.length; i < len; i++) {
      const [key, obj] = entries[i];
      const instance = new type();
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          instance[prop] = obj[prop];
        }
      }
      result[key] = instance;
    }
    return result;
  }) as PropertyDecorator;
}
