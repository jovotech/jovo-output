import CardDisplay from '@/components/CardDisplay.vue';
import CarouselDisplay from '@/components/CarouselDisplay.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import OutputTemplateDisplay from '@/components/OutputTemplateDisplay.vue';
import QuickReplyDisplay from '@/components/QuickReplyDisplay.vue';

import type {
  Card,
  Carousel,
  Message,
  MessageValue,
  OutputTemplate,
  OutputTemplateBase,
  OutputTemplatePlatforms,
  PlatformOutputTemplate,
  QuickReply,
  QuickReplyValue,
} from '@jovotech/output';

import './assets/css/theme.pcss';

declare global {
  interface Window {
    JovoOutputComponentsVue: typeof import('./index');
  }
}

export {
  CardDisplay,
  CarouselDisplay,
  MessageDisplay,
  OutputTemplateDisplay,
  QuickReplyDisplay,
  OutputTemplate,
  Message,
  MessageValue,
  QuickReply,
  QuickReplyValue,
  Card,
  Carousel,
  PlatformOutputTemplate,
  OutputTemplatePlatforms,
  OutputTemplateBase,
};
