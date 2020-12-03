import {
  decoratePropertyOfGenericOutput,
  GenericCard,
  GenericCarousel,
  GenericMessage,
  GenericQuickReply,
  toSSML,
} from 'jovo-output';
import { BasicCard, Carousel, GoogleAssistantOutput, SimpleResponse, Suggestion } from './models';

declare module 'jovo-output/dist/models/GenericCard' {
  interface GenericCard {
    toGoogleAssistantBasicCard?(): BasicCard;
  }
}

declare module 'jovo-output/dist/models/GenericCarousel' {
  interface GenericCarousel {
    toGoogleAssistantCarousel?(): Carousel;
  }
}

declare module 'jovo-output/dist/models/GenericMessage' {
  interface GenericMessage {
    toGoogleAssistantSimpleResponse?(): SimpleResponse;
  }
}

declare module 'jovo-output/dist/models/GenericQuickReply' {
  interface GenericQuickReply {
    toGoogleAssistantSuggestion?(): Suggestion;
  }
}

function augmentPrototypes() {
  GenericCard.prototype.toGoogleAssistantBasicCard = function () {
    return {
      title: this.title,
      image: this.imageUrl
        ? {
            url: this.imageUrl,
            accessibilityText: this.title,
          }
        : undefined,
      formattedText: this.subtitle,
    };
  };

  GenericCarousel.prototype.toGoogleAssistantCarousel = function () {
    return {
      items: this.items.map((item) => {
        return {
          optionInfo: {
            key: item.key || item.title,
            synonyms: [],
          },
          title: item.title,
          description: item.subtitle,
          image: item.imageUrl
            ? {
                url: item.imageUrl,
                accessibilityText: item.title,
              }
            : undefined,
        };
      }),
    };
  };

  GenericMessage.prototype.toGoogleAssistantSimpleResponse = function () {
    return {
      displayText: this.displayText,
      ssml: toSSML(this.text),
    };
  };

  GenericQuickReply.prototype.toGoogleAssistantSuggestion = function () {
    return {
      title: this.text,
    };
  };
}

// augment the prototypes of the generic models to have methods to convert to the GoogleAssistant-variant
augmentPrototypes();

// Make GoogleAssistantOutput available for the GenericOutput-object via the GoogleAssistant-key.
declare module 'jovo-output/dist/models/GenericOutput' {
  interface GenericOutput {
    GoogleAssistant?: GoogleAssistantOutput;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
decoratePropertyOfGenericOutput('GoogleAssistant', GoogleAssistantOutput);

export * from './validation/decorators/IsValidRichResponseItemArray';

export * from './models';

export * from './GoogleAssistantOutputConverterStrategy';
