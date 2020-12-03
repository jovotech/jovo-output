import { toSSML, removeSSML } from '../src';

describe('toSSML', () => {
  test('plain text', () => {
    expect(toSSML('foo')).toBe('<speak>foo</speak>');
  });

  test('ssml', () => {
    expect(toSSML('<speak>foo</speak>')).toBe('<speak>foo</speak>');
  });
});

describe('removeSSML', () => {
  test('plain text', () => {
    expect(removeSSML('foo')).toBe('foo');
  });

  test('ssml', () => {
    expect(removeSSML('<speak>foo<break time="300ms" /></speak>')).toBe('foo');
  });
});
