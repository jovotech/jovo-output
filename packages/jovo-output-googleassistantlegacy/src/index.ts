import { decoratePropertyOfGenericOutput } from 'jovo-output';
import { GoogleAssistantOutput } from './models/GoogleAssistantOutput';

// Make GoogleAssistantOutput available for the GenericOutput-object via the GoogleAssistant-key.
declare module 'jovo-output/dist/models/GenericOutput' {
  interface GenericOutput {
    GoogleAssistant?: GoogleAssistantOutput;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
decoratePropertyOfGenericOutput('GoogleAssistant', GoogleAssistantOutput);

export * from './models';
export * from './GoogleAssistantOutputConverterStrategy';
