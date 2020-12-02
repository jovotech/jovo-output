import { GenericOutput } from '.';

export interface OutputConverterStrategy<Response extends Record<string, unknown>> {
  responseClass: new () => Response;

  toResponse(output: GenericOutput): Promise<Response>;
  fromResponse(response: Response): Promise<GenericOutput>;
}