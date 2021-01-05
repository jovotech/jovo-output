import {
  GenericCard,
  GenericCarousel,
  GenericMessage,
  GenericQuickReply,
  toSSML,
} from 'jovo-output';
import { BasicCard, CollectionItem, SimpleResponse } from './models';

export function augmentGenericPrototypes(): void {
  GenericCard.prototype.toGoogleAssistantBasicCard = function () {
    const basicCard: BasicCard = {
      title: this.title,
    };
    if (this.subtitle) {
      basicCard.formattedText = this.subtitle;
    }
    if (this.imageUrl) {
      basicCard.image = {
        url: this.imageUrl,
        accessibilityText: this.title,
      };
    }
    return basicCard;
  };

  GenericCarousel.prototype.toGoogleAssistantCarousel = function () {
    return {
      items: this.items.map((item) => {
        const collectionItem: CollectionItem = {
          optionInfo: {
            key: item.key || item.title,
            synonyms: [],
          },
          title: item.title,
        };
        if (item.subtitle) {
          collectionItem.description = item.subtitle;
        }
        if (item.imageUrl) {
          collectionItem.image = {
            url: item.imageUrl,
            accessibilityText: item.title,
          };
        }
        return collectionItem;
      }),
    };
  };

  GenericMessage.prototype.toGoogleAssistantSimpleResponse = function () {
    const simpleResponse: SimpleResponse = {
      ssml: toSSML(this.text),
    };
    if (this.displayText) {
      simpleResponse.displayText = this.displayText;
    }
    return simpleResponse;
  };

  GenericQuickReply.prototype.toGoogleAssistantSuggestion = function () {
    return {
      title: this.text,
    };
  };
}