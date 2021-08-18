import { OutputTemplate } from '../models/OutputTemplate';
import {
  OutputTemplateConverterStrategy,
  OutputTemplateConverterStrategyConfig,
} from '../OutputTemplateConverterStrategy';

/**
 * Strategy that can have multiple OutputTemplates and multiple Responses.
 */
export abstract class MultipleResponsesOutputTemplateConverterStrategy<
  RESPONSE extends Record<string, unknown>,
  CONFIG extends OutputTemplateConverterStrategyConfig,
> extends OutputTemplateConverterStrategy<RESPONSE, CONFIG> {
  prepareOutput(output: OutputTemplate | OutputTemplate[]): OutputTemplate | OutputTemplate[] {
    output = super.prepareOutput(output);
    if (!this.shouldSanitize()) {
      return output;
    }
    return Array.isArray(output)
      ? output.map((outputItem, index) => this.sanitizeOutput(outputItem, index))
      : this.sanitizeOutput(output);
  }

  protected abstract sanitizeOutput(output: OutputTemplate, index?: number): OutputTemplate;

  abstract convertOutput(output: OutputTemplate): RESPONSE | RESPONSE[];
  abstract convertResponse(response: RESPONSE): OutputTemplate;

  toResponse(output: OutputTemplate | OutputTemplate[]): RESPONSE | RESPONSE[] {
    return Array.isArray(output)
      ? output
          .map((outputItem) => this.convertOutput(outputItem))
          .reduce((accumulator: RESPONSE[], currentValue) => {
            if (Array.isArray(currentValue)) {
              accumulator.push(...currentValue);
            } else {
              accumulator.push(currentValue);
            }
            return accumulator;
          }, [])
      : this.convertOutput(output);
  }

  fromResponse(responseOrResponses: RESPONSE | RESPONSE[]): OutputTemplate | OutputTemplate[] {
    return Array.isArray(responseOrResponses)
      ? responseOrResponses.map((responseItem) => this.convertResponse(responseItem))
      : this.convertResponse(responseOrResponses);
  }
}
