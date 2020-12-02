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

