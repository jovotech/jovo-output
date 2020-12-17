import { decoratePropertyOfGenericOutput, GenericCard, GenericMessage } from 'jovo-output';
import { AlexaOutput } from './models/AlexaOutput';
import { Card, CardType } from './models/card/Card';
import { OutputSpeech, OutputSpeechType, PlayBehavior } from './models/common/OutputSpeech';

declare module 'jovo-output/dist/models/GenericCard' {
  interface GenericCard {
    toAlexaCard?(): Card<CardType.Standard>;
  }
}

declare module 'jovo-output/dist/models/GenericMessage' {
  interface GenericMessage {
    toAlexaOutputSpeech?(): OutputSpeech<OutputSpeechType.Ssml>;
  }
}

function augmentPrototypes() {
  GenericCard.prototype.toAlexaCard = function () {
    const card: Card<CardType.Standard> = {
      type: CardType.Standard,
      title: this.title,
      text: this.subtitle,
    };
    if (this.imageUrl) {
      card.image = {
        // TODO: determine whether large should always be set
        largeImageUrl: this.imageUrl,
      };
    }
    return card;
  };

  GenericMessage.prototype.toAlexaOutputSpeech = function () {
    return {
      type: OutputSpeechType.Ssml,
      ssml: this.text,
      // TODO: determine whether ReplaceEnqueued should always be set
      playBehavior: PlayBehavior.ReplaceEnqueued,
    };
  };
}

augmentPrototypes();

// Make AlexaOutput available for the GenericOutput-object via the Alexa-key.
declare module 'jovo-output/dist/models/GenericOutput' {
  interface GenericOutput {
    Alexa?: AlexaOutput;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
decoratePropertyOfGenericOutput('Alexa', AlexaOutput);

export * from './decorators/validation/IsValidCardImage';
export * from './decorators/validation/IsValidCardImageUrl';
export * from './decorators/validation/IsValidCardString';
export * from './decorators/validation/IsValidAlexaString';
export * from './decorators/validation/IsValidOutputSpeechString';

export * from './models';

export * from './AlexaOutputConverterStrategy';

export * from './utilities';
