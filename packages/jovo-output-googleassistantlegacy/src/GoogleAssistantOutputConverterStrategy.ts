import { GenericOutput, OutputConverterStrategy } from 'jovo-output';
import { GoogleAssistantResponse } from './index';

export class GoogleAssistantOutputConverterStrategy
  implements OutputConverterStrategy<GoogleAssistantResponse> {
  responseClass = GoogleAssistantResponse;

  toResponse(output: GenericOutput): Promise<GoogleAssistantResponse> {
    throw new Error('Not implemented yet.');
  }

  fromResponse(response: GoogleAssistantResponse): Promise<GenericOutput> {
    throw new Error('Not implemented yet.');
  }
}
