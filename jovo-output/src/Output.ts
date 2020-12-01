import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {InvalidOutputModelError} from './errors/InvalidOutputModelError';
import {OutputValidationError} from './errors/OutputValidationError';
import { GenericOutput, OutputStrategy } from './index';

// TODO: find a better name
export class Output<OUTPUT extends Record<string, unknown>> {
  constructor(public strategy: OutputStrategy<OUTPUT>) {}

  validateGenericOutput(genericOutput: GenericOutput): Promise<ValidationError[]> {
    const instance = plainToClass(GenericOutput, genericOutput);
    return validate(instance);
  }

  validatePlatformOutput(platformOutput: OUTPUT): Promise<ValidationError[]> {
    const instance = plainToClass(this.strategy.outputClass, platformOutput);
    return validate(instance);
  }

  async convert(genericOutput: GenericOutput): Promise<OUTPUT> {
    const errors = await this.validateGenericOutput(genericOutput);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Can not convert.\n');
    }
    return this.strategy.convert(genericOutput);
  }

  async parse(platformOutput: OUTPUT): Promise<GenericOutput> {
    const errors = await this.validateGenericOutput(platformOutput);
    if (errors.length) {
      throw new OutputValidationError(errors, 'Can not parse.\n');
    }
    return this.strategy.parse(platformOutput);
  }
}
