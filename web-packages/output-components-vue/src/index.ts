import GenericCardDisplay from '@/components/output/GenericCardDisplay.vue';
import GenericCarouselDisplay from '@/components/output/GenericCarouselDisplay.vue';
import GenericMessageDisplay from '@/components/output/GenericMessageDisplay.vue';
import GenericOutputDisplay from '@/components/output/GenericOutputDisplay.vue';
import GenericQuickReplyDisplay from '@/components/output/GenericQuickReplyDisplay.vue';

import type {
  GenericOutput,
  GenericMessage,
  Message,
  GenericQuickReply,
  QuickReply,
  GenericCard,
  GenericCarousel,
  PlatformOutput,
  GenericOutputPlatforms,
  GenericOutputBase,
} from '@jovotech/output';

import './assets/css/theme.pcss';

declare global {
  interface Window {
    JovoOutputComponentsVue: typeof import('./index');
  }
}

export {
  GenericCardDisplay,
  GenericCarouselDisplay,
  GenericMessageDisplay,
  GenericOutputDisplay,
  GenericQuickReplyDisplay,
  GenericOutput,
  GenericMessage,
  Message,
  GenericQuickReply,
  QuickReply,
  GenericCard,
  GenericCarousel,
  PlatformOutput,
  GenericOutputPlatforms,
  GenericOutputBase,
};
