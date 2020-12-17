import { decoratePropertyOfGenericOutput } from 'jovo-output';
import { FacebookMessengerOutput } from './models';

// Make FacebookMessengerOutput available for the GenericOutput-object via the FacebookMessenger-key.
declare module 'jovo-output/dist/models/GenericOutput' {
  interface GenericOutput {
    FacebookMessenger?: FacebookMessengerOutput;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
decoratePropertyOfGenericOutput('FacebookMessenger', FacebookMessengerOutput);

export * from './decorators/transformation/TransformButton';
export * from './decorators/validation/CastedMaxLength';
export * from './decorators/validation/IsValidGameMetaDataString';

export * from './models';

export * from './FacebookMessengerOutputConverterStrategy';
