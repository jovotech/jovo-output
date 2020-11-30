import { GenericOutput, OutputStrategy } from 'jovo-output';
import { GoogleAssistantOutput } from './index';

export class GoogleAssistantOutputStrategy implements OutputStrategy<GoogleAssistantOutput> {
  outputClass = GoogleAssistantOutput;

  convert(genericOutput: GenericOutput): Promise<GoogleAssistantOutput> {
    throw new Error('Not implemented!');
  }

  parse(platformOutput: GoogleAssistantOutput): Promise<GenericOutput> {
    throw new Error('Not implemented!');
  }
}
