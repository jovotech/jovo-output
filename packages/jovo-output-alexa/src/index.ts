import { decoratePropertyOfGenericOutput, GenericCard, GenericMessage } from 'jovo-output';
import { AlexaOutput } from './models/AlexaOutput';
import { Card, CardType } from './models/Card';
import { OutputSpeech, OutputSpeechType, PlayBehavior } from './models/OutputSpeech';

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

// Make GoogleAssistantOutput available for the GenericOutput-object via the GoogleAssistant-key.
declare module 'jovo-output/dist/models/GenericOutput' {
  interface GenericOutput {
    Alexa?: AlexaOutput;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
decoratePropertyOfGenericOutput('Alexa', AlexaOutput);

export * from './validation/decorators/IsValidCardImage';
export * from './validation/decorators/IsValidCardImageUrl';
export * from './validation/decorators/IsValidCardString';
export * from './validation/decorators/IsValidOutputSpeechString';

export * from './models/AlexaOutput';
export * from './models/AlexaResponse';
export * from './models/Card';
export * from './models/CardImage';
export * from './models/Directive';
export * from './models/OutputSpeech';
export * from './models/Reprompt';
export * from './models/Response';

export * from './AlexaOutputConverterStrategy';

export * from './utilities'
