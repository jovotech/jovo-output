import CardDisplay from '@/components/output/CardDisplay.vue';
import CarouselDisplay from '@/components/output/CarouselDisplay.vue';
import MessageDisplay from '@/components/output/MessageDisplay.vue';
import OutputTemplateDisplay from '@/components/output/OutputTemplateDisplay.vue';
import QuickReplyDisplay from '@/components/output/QuickReplyDisplay.vue';

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
