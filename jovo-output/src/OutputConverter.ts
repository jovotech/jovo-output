import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { OutputValidationError } from './errors/OutputValidationError';
import { GenericOutput, OutputConverterStrategy } from './index';

export class OutputConverter<Response extends Record<string, unknown>> {
  constructor(public strategy: OutputConverterStrategy<Response>) {}

  validateOutput(output: GenericOutput): Promise<ValidationError[]> {
    const instance = plainToClass(GenericOutput, output);
    return validate(instance);
  }

  validateResponse(platformOutput: Response): Promise<ValidationError[]> {
    const instance = plainToClass(this.strategy.responseClass, platformOutput);
    return validate(instance);
  }

  async toResponse(output: GenericOutput): Promise<Response> {
    const errors = await this.validateOutput(output);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Can not convert.\n');
    }
    return this.strategy.toResponse(output);
  }

  async fromResponse(response: Response): Promise<GenericOutput> {
    const errors = await this.validateResponse(response);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Can not parse.\n');
    }
    return this.strategy.fromResponse(response);
  }
}
