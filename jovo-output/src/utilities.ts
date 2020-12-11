import { Type } from 'class-transformer';
import { GenericOutput, IsOptional, ValidateNested, ValidationError } from '.';

// TODO: find a better name
export function decoratePropertyOfGenericOutput<TYPE extends Record<string, unknown>>(
  propertyKey: string,
  propertyType: new () => TYPE,
): void {
  IsOptional()(GenericOutput.prototype, propertyKey);
  ValidateNested()(GenericOutput.prototype, propertyKey);
  Type(() => propertyType)(GenericOutput.prototype, propertyKey);
}

export function toSSML(text: string): string {
  text = text.replace(/<[/]?speak>/g, '');
  return `<speak>${text}</speak>`;
}

export function removeSSMLSpeakTags(ssml: string): string {
  return ssml.replace(/<[/]?speak>/g, '');
}

export function removeSSML(ssml: string): string {
  return ssml.replace(/<[^>]*>/g, '');
}

export interface FormatValidationErrorsOptions {
  text?: string;
  delimiter?: string;
  path?: string;
}

export function formatValidationErrors(
  errors: ValidationError[],
  options?: FormatValidationErrorsOptions,
): string {
  const errorMessages: string[] = [];

  // go through each validation error, add message for constraints, if children add children with updated path
  function handleValidationError(error: ValidationError, path = '') {
    console.log(error);
    path += error.property;
    console.log(path);
    if (error.constraints) {
      const values = Object.values(error.constraints);
      errorMessages.push(
        ...values.map((text) => {
          return `${path.endsWith('.') ? path.slice(0, path.length - 1) : path}: ${text}`;
        }),
      );
    }
    if (error.children?.length) {
      for (let i = 0, len = error.children.length; i < len; i++) {
        handleValidationError(error.children[i], path + '.');
      }
    }
  }

  for (let i = 0, len = errors.length; i < len; i++) {
    handleValidationError(errors[i], options?.path ? `${options.path}.` : undefined);
  }

  const { text, delimiter } = { text: '', delimiter: '\n - ', ...(options || {}) };

  return `${text}${delimiter}${errorMessages.join(delimiter)}`;
}

export function formatList(
  items: Array<string | number | symbol>,
  delimiter = ', ',
  lastDelimiter = ' or ',
): string {
  if (items.length === 0) {
    return '';
  }
  if (items.length === 1) {
    return items[0].toString();
  }
  return `${items
    .slice(0, items.length - 1)
    .map((item) => item.toString())
    .join(delimiter)}${lastDelimiter}${items[items.length - 1].toString()}`;
}
