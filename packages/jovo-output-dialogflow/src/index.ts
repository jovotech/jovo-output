import { registerOutputPlatform } from 'jovo-output';
import { Card, DialogflowOutput, Text } from './models';
import { augmentGenericPrototypes } from './utilities';

declare module 'jovo-output/dist/models/GenericCard' {
  interface GenericCard {
    toDialogflowCard?(): Card;
  }
}

declare module 'jovo-output/dist/models/GenericMessage' {
  interface GenericMessage {
    toDialogflowText?(): Text;
  }
}

declare module 'jovo-output/dist/models/GenericQuickReply' {
  interface GenericQuickReply {
    toDialogflowQuickReply?(): string;
  }
}

// augment the prototypes of the generic models to have methods to convert to the Dialogflow-variant
augmentGenericPrototypes();

// Make DialogflowOutput available for the GenericOutputPlatforms-object via the Dialogflow-key.
declare module 'jovo-output/dist/models/GenericOutputPlatforms' {
  interface GenericOutputPlatforms {
    Dialogflow?: DialogflowOutput;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
registerOutputPlatform('Dialogflow', DialogflowOutput);

export * from './decorators/validation/EntitySynonymsContainValue';
export * from './decorators/validation/IsValidMessageContentObject';
export * from './decorators/validation/IsValidRbmSuggestionContentObject';
export * from './decorators/validation/IsValidRbmSuggestedActionContentObject';
export * from './decorators/validation/IsValidTelephonySynthesizeSpeechString';

export * from './DialogflowOutputConverterStrategy';

export * from './models';