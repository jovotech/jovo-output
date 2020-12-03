import { GenericOutput, Message, OutputConverterStrategy, QuickReply, toSSML } from 'jovo-output';
import { GoogleAssistantResponse, SimpleResponse, Suggestion } from './index';

export class GoogleAssistantOutputConverterStrategy
  implements OutputConverterStrategy<GoogleAssistantResponse> {
  responseClass = GoogleAssistantResponse;

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
        simpleResponse: this.convertMessageToSimpleResponse(message),
      });
    }

    const reprompt = output.GoogleAssistant?.reprompt || output.reprompt;
    if (reprompt) {
      response.noInputPrompts = [this.convertMessageToSimpleResponse(reprompt)];
    }

    const quickReplies = output.GoogleAssistant?.quickReplies || output.quickReplies;
    if (quickReplies?.length) {
      response.richResponse.suggestions = quickReplies.map(this.convertQuickReplyToSuggestion);
    }

    const card = output.GoogleAssistant?.card || output.card;
    if (card) {
      response.richResponse.items.push({
        basicCard: card.toGoogleAssistantBasicCard?.(),
      });
    }

    const carousel = output.GoogleAssistant?.carousel || output.carousel;
    if (carousel) {
      response.systemIntent = {
        intent: 'actions.intent.OPTION',
        data: {
          '@type': 'type.googleapis.com/google.actions.v2.OptionValueSpec',
          'carouselSelect': carousel.toGoogleAssistantCarousel?.(),
        },
      };
    }

    const responseKeys: Array<keyof GoogleAssistantResponse> = [
      'expectUserResponse',
      'systemIntent',
      'noInputPrompts',
      'richResponse',
    ];

    for (const responseKey of responseKeys) {
      if (output.GoogleAssistant?.[responseKey]) {
        response[responseKey] = output.GoogleAssistant[responseKey];
      }
    }

    return response;
  }

  fromResponse(response: GoogleAssistantResponse): GenericOutput {
    const output: GenericOutput = {};

    const simpleResponse = response.richResponse?.items?.[0]?.simpleResponse;
    if (simpleResponse && simpleResponse.ssml && simpleResponse.toMessage) {
      output.message = simpleResponse.toMessage();
    }

    if (response.noInputPrompts?.length) {
      output.reprompt = response.noInputPrompts[0].toMessage?.();
    }

    if (response.expectUserResponse) {
      output.listen = response.expectUserResponse;
    }

    const suggestions = response.richResponse.suggestions;
    if (suggestions?.length) {
      output.quickReplies = suggestions.map((suggestion) => {
        return suggestion.toQuickReply!();
      });
    }

    const basicCard = response.richResponse.items.find((item) => item.basicCard)?.basicCard;
    if (basicCard?.toGenericCard) {
      output.card = basicCard?.toGenericCard();
    }

    if (
      response.systemIntent?.intent === 'actions.intent.OPTION' &&
      response.systemIntent?.data?.carouselSelect
    ) {
      output.carousel = response.systemIntent.data.carouselSelect.toGenericCarousel?.();
    }

    return output;
  }

  convertMessageToSimpleResponse(message: Message): SimpleResponse {
    return typeof message === 'string'
      ? { ssml: toSSML(message) }
      : message.toGoogleAssistantSimpleResponse?.() || {
          ssml: toSSML(message.text),
          displayText: message.displayText,
        };
  }

  convertQuickReplyToSuggestion(quickReply: QuickReply): Suggestion {
    return typeof quickReply === 'string'
      ? { title: quickReply }
      : quickReply.toGoogleAssistantSuggestion?.() || {
          title: quickReply.text,
        };
  }
}
