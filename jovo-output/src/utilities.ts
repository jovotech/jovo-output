import { Type } from 'class-transformer';
import { GenericOutput, ValidateNested } from '.';

// TODO: find a better name
export function decoratePropertyOfGenericOutput<TYPE extends Record<string, unknown>>(
  propertyKey: string,
  propertyType: new () => TYPE,
): void {
  ValidateNested()(GenericOutput.prototype, propertyKey);
  Type(() => propertyType)(GenericOutput.prototype, propertyKey);
}

export function toSSML(text: string): string {
  text = text.replace(/<[/]?speak>/g, '');
  return `<speak>${text}</speak>`;
}

export function removeSSML(ssml: string): string {
  return ssml.replace(/<[^>]*>/g, '');
}
