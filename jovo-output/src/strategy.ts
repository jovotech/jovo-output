import { GenericOutput } from '.';

export interface OutputStrategy<OUTPUT extends Record<string, unknown>> {
  outputClass: new () => OUTPUT;

  convert(genericOutput: GenericOutput): Promise<OUTPUT>;

  parse(platformOutput: OUTPUT): Promise<GenericOutput>;
}
