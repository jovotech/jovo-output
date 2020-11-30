import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { GenericOutput, OutputStrategy } from './index';

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

  convert(genericOutput: GenericOutput): Promise<OUTPUT> {
    return this.strategy.convert(genericOutput);
  }

  parse(platformOutput: OUTPUT): Promise<GenericOutput> {
    return this.strategy.parse(platformOutput);
  }
}
