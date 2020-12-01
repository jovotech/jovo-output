import { decoratePropertyOfGenericOutput } from 'jovo-output';
import { GenericGoogleAssistantOutput } from './models/GenericGoogleAssistantOutput';

// Make GenericGoogleAssistantOutput available for the GenericOutput-object via the GoogleAssistant-key.
declare module 'jovo-output/dist/models/GenericOutput' {
  interface GenericOutput {
    GoogleAssistant?: GenericGoogleAssistantOutput;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
decoratePropertyOfGenericOutput('GoogleAssistant', GenericGoogleAssistantOutput);

export * from './models/GoogleAssistantOutput';
export * from './models/GenericGoogleAssistantOutput';
export * from './GoogleAssistantOutputStrategy';
