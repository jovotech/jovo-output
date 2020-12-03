import { IsString, ValidationError } from '..';

export class OutputValidationError extends Error {
  constructor(readonly validationErrors: ValidationError[], readonly prefix = '') {
    super();
    this.message = this.buildMessage();
  }

  private buildMessage(): string {
    const errorMessages: string[] = [];

    // go through each validation error, add message for constraints, if children add children with updated path
    function handleValidationError(error: ValidationError, path = '') {
      if (error.constraints) {
        const values = Object.values(error.constraints);
        errorMessages.push(
          ...values.map((text) => {
            return `${path}: ${text}`;
          }),
        );
      }
      path += error.property;
      if (error.children?.length) {
        for (let i = 0, len = error.children.length; i < len; i++) {
          handleValidationError(error.children[i], path + '.');
        }
      }
    }

    for (let i = 0, len = this.validationErrors.length; i < len; i++) {
      handleValidationError(this.validationErrors[i]);
    }

    return `${this.prefix}Validation errors:\n - ${errorMessages.join('\n - ')}`;
  }
}
