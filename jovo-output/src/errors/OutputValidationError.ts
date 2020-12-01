import { ValidationError } from '..';

export class OutputValidationError extends Error {
  constructor(readonly validationErrors: ValidationError[], readonly prefix = '') {
    super();
    this.message = this.buildMessage();
  }

  private buildMessage(): string {
    const constraintErrors = this.validationErrors
      .filter((error) => {
        return error.constraints;
      })
      .map((error) => {
        return Object.values(error.constraints as Record<string, string>);
      })
      .reduce((prev, current, index) => {
        prev.push(...current);
        return prev;
      }, []);
    return `${this.prefix}Validation errors:\n - ${constraintErrors.join(
      '\n - ',
    )}`;
  }
}
