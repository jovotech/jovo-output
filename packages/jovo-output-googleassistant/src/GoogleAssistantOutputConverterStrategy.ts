import { GenericOutput, OutputConverterStrategy } from 'jovo-output';
import { GoogleAssistantResponse } from './models/GoogleAssistantResponse';

export class GoogleAssistantOutputConverterStrategy
  implements OutputConverterStrategy<GoogleAssistantResponse> {
  responseClass = GoogleAssistantResponse;

  toResponse(output: GenericOutput): GoogleAssistantResponse {
    const response: GoogleAssistantResponse = {};

    return response;
  }

  fromResponse(response: GoogleAssistantResponse): GenericOutput {
    const output: GenericOutput = {};

    return output;
  }
}
