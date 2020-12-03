import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { OutputValidationError } from './errors/OutputValidationError';
import { GenericOutput, OutputConverterStrategy } from './index';

// TODO: check if validation should happen before and after conversion
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
    let errors = await this.validateOutput(output);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Can not convert.\n');
    }
    const response = this.strategy.toResponse(output);
    errors = await this.validateResponse(response);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Conversion caused invalid response.\n');
    }
    return response;
  }

  async fromResponse(response: Response): Promise<GenericOutput> {
    let errors = await this.validateResponse(response);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Can not parse.\n');
    }
    const output = this.strategy.fromResponse(response);
    errors = await this.validateOutput(output);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Conversion caused invalid output.\n');
    }
    return output;
  }
}
