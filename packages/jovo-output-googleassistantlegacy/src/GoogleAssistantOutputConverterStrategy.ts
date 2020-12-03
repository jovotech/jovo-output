import {
  GenericCard,
  GenericCarousel,
  GenericOutput,
  Message,
  OutputConverterStrategy,
  QuickReply,
  toSSML,
} from 'jovo-output';
import { BasicCard, GoogleAssistantResponse, SimpleResponse, Suggestion } from './index';
import { Carousel } from './models/collection/Carousel';

export class GoogleAssistantOutputConverterStrategy
  implements OutputConverterStrategy<GoogleAssistantResponse> {
  responseClass = GoogleAssistantResponse;

  // TODO implement case where richResponse for example is set in output.GoogleAssistant
  toResponse(output: GenericOutput): GoogleAssistantResponse {
    const response: GoogleAssistantResponse = {
      expectUserResponse: output.GoogleAssistant?.listen ?? output.listen,
      richResponse: {
        items: [],
      },
    };

    const message = output.GoogleAssistant?.message || output.message;
    if (message) {
      response.richResponse.items.push({
        simpleResponse: this.convertMessage(message),
      });
    }

    const reprompt = output.GoogleAssistant?.reprompt || output.reprompt;
    if (reprompt) {
      response.noInputPrompts = [this.convertMessage(reprompt)];
    }

    const quickReplies = output.GoogleAssistant?.quickReplies || output.quickReplies;
    if (quickReplies?.length) {
      response.richResponse.suggestions = quickReplies.map(this.convertQuickReply);
    }

    const card = output.GoogleAssistant?.card || output.card;
    if (card) {
      response.richResponse.items.push({
        basicCard: this.convertCard(card),
      });
    }

    const carousel = output.GoogleAssistant?.carousel || output.carousel;
    if (carousel) {
      response.systemIntent = {
        intent: 'actions.intent.OPTION',
        data: {
          '@type': 'type.googleapis.com/google.actions.v2.OptionValueSpec',
          'carouselSelect': this.convertCarousel(carousel),
        },
      };
    }

    return response;
  }

  fromResponse(response: GoogleAssistantResponse): GenericOutput {
    throw new Error('Not implemented yet.');
  }

  convertMessage(message: Message): SimpleResponse {
    return {
      displayText: typeof message !== 'string' ? message.displayText : undefined,
      ssml: toSSML(typeof message === 'string' ? message : message.text),
    };
  }

  convertQuickReply(quickReply: QuickReply): Suggestion {
    return {
      title: typeof quickReply === 'string' ? quickReply : quickReply.text,
    };
  }

  // TODO maybe set values differently
  convertCard(card: GenericCard): BasicCard {
    return {
      title: card.title,
      image: card.imageUrl
        ? {
            url: card.imageUrl,
            accessibilityText: card.title,
          }
        : undefined,
      formattedText: card.subtitle,
    };
  }

  convertCarousel(carousel: GenericCarousel): Carousel {
    return {
      items: carousel.items.map((item) => {
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
  }
}
