import { Card, Carousel, Message, QuickReply, RichAudio } from '@jovotech/output';
import {
  Card as GoogleAssistantCard,
  Collection,
  Simple,
  TypeOverride,
  TypeOverrideMode,
} from './models';

function genGoogleChildSSML(elem: RichAudio): string {
  if (elem.type === 'Mixer' || elem.type === 'Sequencer') {
    return genGoogleSSML(elem);
  }
  return `<media>${genGoogleSSML(elem)}</media>`;
}

export function genGoogleSSML(elem: RichAudio): string {
  if (elem.type === 'Audio') {
    return `<audio src="${elem.source}" />`;
  }
  if (elem.type === 'Speech') {
    return `<p>${elem.content}</p>`;
  }
  if (elem.type === 'Silence') {
    return `<break time="${elem.duration}ms" />`;
  }
  if (elem.type === 'Sequencer') {
    return `<seq>${elem.items.map(genGoogleChildSSML).join('')}</seq>`;
  }
  if (elem.type === 'Mixer') {
    return `<par>${elem.items.map(genGoogleChildSSML).join('')}</par>`;
  }

  throw new Error(`Unrecognised RichAudio item: ${elem}`);
}

export function augmentModelPrototypes(): void {
  Card.prototype.toGoogleAssistantCard = function () {
    const card: GoogleAssistantCard = {
      title: this.title,
    };
    if (this.subtitle) {
      card.subtitle = this.subtitle;
    }
    if (this.content) {
      card.text = this.content;
    }
    if (this.imageUrl) {
      card.image = {
        url: this.imageUrl,
        alt: this.title,
      };
    }
    return card;
  };

  Carousel.prototype.toGoogleAssistantCollectionData = function () {
    const typeOverride: TypeOverride = {
      name: 'prompt_option',
      mode: TypeOverrideMode.Replace,
      synonym: {
        entries: this.items.map((item, index) => {
          return {
            name: item.key || `ITEM_${index + 1}`,
            synonyms: [],
            display: {
              title: item.title,
              description: item.subtitle,
              image: item.imageUrl ? { alt: item.title, url: item.imageUrl } : undefined,
            },
          };
        }),
      },
    };

    const collection: Collection = {
      items: this.items.map((item, index) => {
        return {
          key: item.key || `ITEM_${index + 1}`,
        };
      }),
    };

    return { collection, typeOverride };
  };

  RichAudio.prototype.toGoogleAssistantSsml = function () {
    return genGoogleSSML(this);
  };

  Message.prototype.toGoogleAssistantSimple = function () {
    const simple: Simple = {
      speech: this.text,
    };
    if (this.displayText) {
      simple.text = this.displayText;
    }
    return simple;
  };

  QuickReply.prototype.toGoogleAssistantSuggestion = function () {
    return {
      title: this.text,
    };
  };
}
