import { registerOutputPlatform } from '@jovotech/output';
import {
  CardContent,
  CarouselCard,
  NormalizedGoogleBusinessOutputTemplate,
  RichCard,
  StandaloneCard,
  Suggestion,
} from './models';
import { augmentModelPrototypes } from './utilities';

declare module '@jovotech/output/dist/types/models/Card' {
  interface Card {
    suggestions?: Suggestion[];

    toGoogleBusinessCardContent?(): CardContent;
    toGoogleBusinessCard?(): StandaloneCard;
    toGoogleBusinessRichCard?(): RichCard;
  }
}

declare module '@jovotech/output/dist/types/models/Carousel' {
  interface Carousel {
    toGoogleBusinessCarousel?(): CarouselCard;
    toGoogleBusinessRichCard?(): RichCard;
  }
}

declare module '@jovotech/output/dist/types/models/Message' {
  interface Message {
    toGoogleBusinessText?(): string;
  }
}

declare module '@jovotech/output/dist/types/models/QuickReply' {
  interface QuickReply {
    toGoogleBusinessSuggestion?(): Suggestion;
  }
}

// augment the prototypes of the generic models to have methods to convert to the GoogleBusiness-variant
augmentModelPrototypes();

// Make NormalizedGoogleAssistantOutputTemplate available for the NormalizedOutputTemplatePlatforms-object via the googleBusiness-key.
declare module '@jovotech/output/dist/types/models/NormalizedOutputTemplatePlatforms' {
  interface NormalizedOutputTemplatePlatforms {
    googleBusiness?: NormalizedGoogleBusinessOutputTemplate;
  }
}
// Additionally, make class-validator and class-transformer aware of the added property.
registerOutputPlatform('googleBusiness', NormalizedGoogleBusinessOutputTemplate);

export * from './decorators/validation/IsValidRichCardObject';
export * from './decorators/validation/IsValidSuggestedActionObject';
export * from './decorators/validation/IsValidSuggestionObject';

export * from './models';
export * from './constants';

export * from './GoogleBusinessOutputTemplateConverterStrategy';
export { convertMessageToGoogleBusinessText } from './utilities';
